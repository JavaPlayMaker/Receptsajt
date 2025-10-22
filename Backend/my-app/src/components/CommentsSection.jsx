import { useState } from "react";
import CommentForm from "./CommentForm";
import CommentList from "./CommentList";

export default function CommentsSection({ recipeId }) {
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [formResetTrigger, setFormResetTrigger] = useState(0);

  const handleCommentAdded = () => {

    setRefreshTrigger((prev) => prev + 1);
    
    // Refresh after 5 second (to match thank-you display)
    setTimeout(() => {
      setFormResetTrigger((prev) => prev + 1);
    }, 5000);
  };

  return (
    <div className="comments-section">
      <CommentForm 
      recipeId={recipeId} 
      onCommentAdded={handleCommentAdded}
      resetTrigger={formResetTrigger} 
      />
      <CommentList recipeId={recipeId} refreshTrigger={refreshTrigger} />
    </div>
  );
}
