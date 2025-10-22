import { useEffect, useState } from "react";
import { getComments } from "../services/api";
import "./others/CommentList.css"; // optional CSS file for styling

export default function CommentList({ recipeId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // show first 3 comments

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments(recipeId);
       
       // Reverse comments so newest comes first(No good but..)
        const sorted = data.reverse();

       /* // Sort comments so newest comes first
          //But DB may have no createdAt timestamp
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt|| b.savedDate) - new Date(a.createAt)
        );*/

        console.log("Loaded comments:", sorted);
        setComments(sorted);
      } catch (err) {
        console.error("Kunde inte ladda kommentarer", err);
      }
    }
    loadComments();
  }, [recipeId, refreshTrigger]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3);
  };

  const visibleComments = comments.slice(0, visibleCount);

  return (
    <div className="comment-list">
      <h3>Kommentarer</h3>

      {comments.length === 0 && <p>Inga kommentarer ännu.</p>}

      {visibleComments.map((c) => (
        <div key={c._id} className="comment-item">
          <div className="comment-header">
            <strong>{c.name}</strong>
            <small className="comment-date">
              {c.createdAt
                ? new Date(c.createdAt).toLocaleString()
                : c.savedDate
                ? c.savedDate
                : ""}
            </small>
          </div>
          <p className="comment-text">{c.comment}</p>
        </div>
      ))}

      {visibleCount < comments.length && (
        <button onClick={handleShowMore} className="show-more-btn">
          Visa fler kommentarer +
        </button>
      )}
    </div>
  );
}