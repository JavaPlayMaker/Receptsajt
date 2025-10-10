import { useState } from "react";
import { postComment } from "../services/api";

export default function CommentForm({ recipeId, onCommentAdded }) {
  const [form, setForm] = useState({ name: "", text: ""});
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name required";
    if (!form.text.trim()) errs.text = "Comment required";
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
      const now= new Date();
      const localTimeStamp=now.toLocaleDateString();   
      const newComment = await postComment(
        recipeId, 
        form.name, 
        form.text, 
        localTimeStamp
      );

      if (onCommentAdded) onCommentAdded(newComment);
      setSubmitted(true);
    } catch  {
    setErrors({ api: "Comments sending failed." });
} finally {
      setSubmitting(false);
    }
  };

  if (submitted) return <p>Thank you for your comment.</p>;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input
            type="text"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            disabled={submitting}
          />
        </label>
        {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
      </div>

      <div>
        <label>
          Comment:
          <textarea
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            disabled={submitting}
          />
        </label>
        {errors.text && <p style={{ color: "red" }}>{errors.text}</p>}
      </div>

      <div>
        <label>
          Datum:
          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            disabled={submitting}
          />
        </label>
        {errors.date && <p style={{ color: "red" }}>{errors.date}</p>}
      </div>

      {errors.api && <p style={{ color: "red" }}>{errors.api}</p>}

      <button type="submit" disabled={submitting}>
        Send
      </button>
    </form>
  );
}

