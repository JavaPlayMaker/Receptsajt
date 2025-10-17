import { useState } from "react";
import { postRating } from "../services/api";

function TodoList({ instructions }) {
  const [checked, setChecked] = useState({});

  const toggleChecked = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div>
      <h3>Instructions</h3>
      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {instructions.map((step, index) => (
          <li key={index} style={{ marginBottom: "8px" }}>
            <label style={{ cursor: "pointer" }}>
              <input
                type="checkbox"
                checked={!!checked[index]}
                onChange={() => toggleChecked(index)}
                style={{ marginRight: "8px" }}
              />
              {`${index + 1}. ${step}`}
            </label>
          </li>
        ))}
      </ul>
      <p>
        {Object.values(checked).filter(Boolean).length} / {instructions.length} steg avklarade!
      </p>
    </div>
  );
}

export default TodoList;