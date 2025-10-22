import { useState } from "react";
import { postComment } from "../services/api";
import "./Interactive/CommentForm.css"; // optional CSS file for styling

export default function CommentForm({ recipeId, onCommentAdded }) {
  const [form, setForm] = useState({ name: "", comment: "" });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [savedDate, setSavedDate] = useState(null);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Namn krävs";
    if (!form.comment.trim()) errs.text = "Kommentar krävs";
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

    try {
      const now = new Date();
      const localTimeStamp = now.toLocaleString();
      const newComment = await postComment(
        recipeId,
        form.name,
        form.comment
      );

      // Add the date client-side (not stored in DB, but shown to user)
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
        {savedDate && 
          <p>
            <em>Sparad: {savedDate}</em>
          </p>
        }
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
                onChange={(e) => 
                  setForm({ ...form, comment: e.target.value })}
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

