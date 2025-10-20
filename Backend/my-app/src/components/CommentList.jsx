import { useEffect, useState } from "react";
import { getComments } from "../services/api";
import "./CommentList.css"; // optional CSS file for styling

export default function CommentList({ recipeId, refreshTrigger }) {
  const [comments, setComments] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3); // start with 3

  useEffect(() => {
    async function loadComments() {
      try {
        const data = await getComments(recipeId);
        console.log("Loaded comments:", data);
        setComments(data);
      } catch (err) {
        console.error("Kunde inte ladda kommentarer", err);
      }
    }
    loadComments();
  }, [recipeId, refreshTrigger]);

  const handleShowMore = () => {
    setVisibleCount((prev) => prev + 3); // show 3 more each time
  };

  return (
    <div className="comment-list">
      <h3>Kommentarer</h3>
      {comments.length === 0 && <p>Inga kommentarer ännu.</p>}
      <table>
        <tbody>
          {comments.map((c) => (
            <tr key={c._id}>
              <td className="comment-meta">
                <strong>{c.name}</strong>
                <br />
                <small>{new Date(c.createdAt).toLocaleString()}</small>
              </td>
            <td className="comment-text">{c.comment}</td>
            </tr>

          ))}
        </tbody>
      </table>

      {visibleCount < comments.length && (
        <button onClick={handleShowMore} style={{ marginTop: "10px" }}>
          Visa fler kommentarer +
        </button>
      )}
    </div>
  );
}