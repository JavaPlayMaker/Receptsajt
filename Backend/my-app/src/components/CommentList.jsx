import { useEffect, useState } from "react";
import { getComments } from "../services/api";

export default function CommentList({ recipeId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // start with 3

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments(recipeId);
        setComments(data);
      } catch (err) {
        console.error("Failed to load comments", err);
      }
    }
    loadComments();
  }, [recipeId, refreshTrigger]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); // show 3 more each time
  };

  return (
    <div>
      <h3>Kommentarer</h3>
      {comments.length === 0 && <p>Inga kommentarer ännu.</p>}
      <ul>
        {comments.slice(0, visibleCount).map((c, i) => (
          <li key={i}>
            <strong>{c.name}</strong> ({c.date})<br />
            {c.text}
          </li>
        ))}
      </ul>

      {visibleCount < comments.length && (
        <button onClick={handleShowMore} style={{ marginTop: "10px" }}>
          Visa fler kommentarer +
        </button>
      )}
    </div>
  );
}
