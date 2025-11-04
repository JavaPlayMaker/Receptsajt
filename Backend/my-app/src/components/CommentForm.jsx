import { useState, useEffect } from "react";
import { postComment } from "../services/api";
import "../pages/Recipe.css";

export default function CommentForm({ recipeId, onCommentAdded, resetTrigger }) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedDate, setSavedDate] = useState(null);

  // 🧹 Reset form when parent triggers reset
  useEffect(() => {
    setForm({ name: "", comment: "" });
    setSubmitted(false);
    setSavedDate(null);
  }, [resetTrigger]);

  // ===============================
  // 🧠 Rate limit logic (5 comments/hour)
  // ===============================
  const MAX_COMMENTS_PER_HOUR = 5;
  const COMMENT_LIMIT_KEY = "comment_timestamps";

  function getStoredCommentTimestamps() {
    const stored = localStorage.getItem(COMMENT_LIMIT_KEY);
    return stored ? JSON.parse(stored) : [];
  }

  function saveCommentTimestamps(timestamps) {
    localStorage.setItem(COMMENT_LIMIT_KEY, JSON.stringify(timestamps));
  }

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Namn krävs";
    if (!form.comment.trim()) errs.comment = "Kommentar krävs";
    return errs;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    // 🕒 Check comment rate limit
    const now = Date.now();
    const oneHourAgo = now - 60 * 60 * 1000; // 1 hour in ms
    let timestamps = getStoredCommentTimestamps();

    // Remove timestamps older than 1 hour
    timestamps = timestamps.filter(ts => ts > oneHourAgo);

    // If already 5 or more comments in the past hour → block
    if (timestamps.length >= MAX_COMMENTS_PER_HOUR) {
      setErrors({
        api: "Du kan bara skicka 5 kommentarer per timme. Försök igen senare.",
      });
      setSubmitting(false);
      return;
    }

    // If allowed, add current timestamp
    timestamps.push(now);
    saveCommentTimestamps(timestamps);

    try {
      const localTimeStamp = new Date().toLocaleString();
      const newComment = await postComment(recipeId, form.name, form.comment);

      // Add the date client-side (not stored in DB, just shown)
      newComment.savedDate = localTimeStamp;

      if (onCommentAdded) onCommentAdded(newComment);
      setSavedDate(localTimeStamp);
      setSubmitted(true);
    } catch (err) {
      console.error("Kommentarer kunde inte skickas:", err);
      setErrors({ api: "Kommentarer kunde inte skickas." });
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="comment-success">
        <p>Tack för din kommentar!</p>
        {savedDate && (
          <p>
            <em>Sparad: {savedDate}</em>
          </p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="comment-form">
      <div className="form-group">
        <label htmlFor="name">Namn:</label>
        <input
          id="name"
          type="text"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          disabled={submitting}
        />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="comment">Kommentar:</label>
        <textarea
          id="comment"
          value={form.comment}
          onChange={(e) => setForm({ ...form, comment: e.target.value })}
          disabled={submitting}
        />
        {errors.comment && <p className="error">{errors.comment}</p>}
      </div>

      {errors.api && <p className="error">{errors.api}</p>}

      <button type="submit" disabled={submitting}>
        {submitting ? "Skickar..." : "Skicka"}
      </button>
    </form>
  );
}
