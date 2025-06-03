import React, { useState, useEffect } from "react";

export default function App() {
  // State for tasks
  const [tasks, setTasks] = useState([]);
  // State for new task input
  const [newTask, setNewTask] = useState("");
  // State for filter mode
  const [filter, setFilter] = useState("all");

  // Load tasks from localStorage on mount
  useEffect(() => {
    const savedTasks = localStorage.getItem("tasks");
    if (savedTasks) setTasks(JSON.parse(savedTasks));
  }, []);

  // Save tasks to localStorage when tasks change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (!newTask.trim()) return; // ignore empty input
    setTasks([
      ...tasks,
      { id: Date.now(), text: newTask.trim(), completed: false },
    ]);
    setNewTask("");
  };

  // Toggle task completion
  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Filter tasks based on filter state
  const filteredTasks = tasks.filter((task) => {
    if (filter === "all") return true;
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
  });

  return (
    <div style={{ maxWidth: 400, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>ToDo App</h1>

      <div style={{ display: "flex", marginBottom: 10 }}>
        <input
          type="text"
          placeholder="Add a new task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && addTask()}
          style={{ flexGrow: 1, padding: 8 }}
        />
        <button onClick={addTask} style={{ marginLeft: 8, padding: "8px 16px" }}>
          Add
        </button>
      </div>

      <div style={{ marginBottom: 10, textAlign: "center" }}>
        <button onClick={() => setFilter("all")} disabled={filter === "all"}>All</button>
        <button onClick={() => setFilter("active")} disabled={filter === "active"} style={{ marginLeft: 5 }}>Active</button>
        <button onClick={() => setFilter("completed")} disabled={filter === "completed"} style={{ marginLeft: 5 }}>Completed</button>
      </div>

      <ul style={{ listStyle: "none", paddingLeft: 0 }}>
        {filteredTasks.length === 0 && <li>No tasks to show</li>}
        {filteredTasks.map((task) => (
          <li key={task.id} style={{ display: "flex", alignItems: "center", marginBottom: 5 }}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleTask(task.id)}
            />
            <span
              style={{
                marginLeft: 8,
                textDecoration: task.completed ? "line-through" : "none",
                flexGrow: 1,
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)} style={{ marginLeft: 8 }}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
