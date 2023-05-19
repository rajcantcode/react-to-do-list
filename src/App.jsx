import { useEffect, useState } from "react";
import ToDoForm from "./ToDoForm";
import ToDoList from "./ToDoList";
import "./style.css";

export default function App() {
  // Bro how does this `useState` know which element to target
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS");
    if (localValue) return JSON.parse(localValue);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  // Add `todo` to list
  const addToDo = function (title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ];
    });
  };

  // Function to toggle ToDo's
  const toggleTodo = function (id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        // Check if id is same
        if (todo.id === id) {
          // We first destructure the `todo` object, because it is immutable (that is we are creating a new object)
          return { ...todo, completed };
        }
        // if id does not match return the `todo` as it is
        return todo;
      });
    });
  };

  // Function to delete `todo`
  const deleteTodo = function (id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  };

  return (
    <>
      <ToDoForm onSubmit={addToDo} />
      <h1 className="header">ToDo List</h1>
      <ToDoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} />
    </>
  );
}
