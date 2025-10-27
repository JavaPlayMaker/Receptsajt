import { useState } from "react";

function ToDoListNew({ instructions }) {
  const [checked, setChecked] = useState({});

  const toggleChecked = (index) => {
    setChecked((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="todo-card">
      <h3>Instruktioner:</h3>
      <p>
        {Object.values(checked).filter(Boolean).length} / {instructions.length} steg avklarade!
      </p>
      <ul>
        {instructions.map((step, index) => (
          <li key={index}>
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
    </div>
  );
}
export default ToDoListNew;
