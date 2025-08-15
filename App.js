import { useEffect, useState } from "react";

function App() {
  const [taskText, setTaskText] = useState("");
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  const addTask = async () => {
    if (!taskText.trim()) return;

    const response = await fetch("http://localhost:5000/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: taskText }),
    });

    const newTask = await response.json();
    setTasks([...tasks, newTask]);
    setTaskText("");
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, { method: "DELETE" });
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div style={{ padding: "2rem", fontFamily: "sans-serif" }}>
      <h1>📌 My Tasks</h1>

      <input
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        placeholder="Add a task..."
        style={{ padding: "5px", width: "200px" }}
      />
      <button onClick={addTask} style={{ marginLeft: "10px" }}>
        Add Task
      </button>

      <ul style={{ marginTop: "20px" }}>
        {tasks.map(task => (
          <li key={task.id}>
            {task.title}
            <button
              onClick={() => deleteTask(task.id)}
              style={{ marginLeft: "10px", color: "red" }}
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
