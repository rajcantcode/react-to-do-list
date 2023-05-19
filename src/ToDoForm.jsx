import { useState } from "react";

export default function ToDoForm(props) {
  const [newItem, setNewItem] = useState("");

  // Function to handle submit event
  const handleSubmit = function (e) {
    e.preventDefault();

    if (newItem === "") return;

    props.onSubmit(newItem);

    // Clear input field
    setNewItem("");
  };

  return (
    <form className="new-item-form" onSubmit={handleSubmit}>
      <div className="form-row">
        <label htmlFor="item">New Item</label>
        <input
          type="text"
          id="item"
          value={newItem}
          onChange={(e) => setNewItem(e.target.value)}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}
