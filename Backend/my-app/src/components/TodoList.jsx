import React, {useState } from "react";

const TodoList = () => {
const steps = [
{ text: "Step 1: Do something", done: false },
{ text: "Step 2: Did something else", done: false },
{ text: "Step 3: Done it", done: false },

];

const [todoList, setTodoList] = useState(steps);

const toggleDone = (index) => {
const updatedList = [...todoList];
updatedList[index].done = !updatedList[index].done;
setTodoList(updatedList);
}

return (
<div>
<h2>Todo List</h2>
<ul style={{ listStyleType: "none", padding: 0}}>
{todoList.map((item, index) => (
<li key={index} style={{ marginBottom: 8 }}>
<label>
<input type="checkbox" checked="{item.done}" onChange={() => toggleDone(index)}
style={{ marginRight: 8 }}
/>
<span
style={{
textDecoration: item.done ? "line-through" : "none",
color: "white"
}}
>
{item.text}
</span>
</label>
</li>
))}
</ul>
</div>
);
};
export default TodoList;