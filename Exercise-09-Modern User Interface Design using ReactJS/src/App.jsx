
import React, { useState } from "react";
import "./App.css";

// Reusable sidebar component
function Sidebar({ activePage, setActivePage }) {
  const menuItems = [
    { name: "Overview", icon: "▦" },
    { name: "My Projects", icon: "▤" },
    { name: "My Tasks", icon: "✓" }
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <div className="brand-mark">F</div>
        <div>
          <h2>folio.</h2>
          <span>WORKSPACE</span>
        </div>
      </div>

      <p className="menu-heading">WORKSPACE</p>

      <nav className="side-navigation">
        {menuItems.map((item) => (
          <button
            key={item.name}
            className={`nav-item ${
              activePage === item.name ? "active" : ""
            }`}
            onClick={() => setActivePage(item.name)}
          >
            <span className="nav-icon">{item.icon}</span>
            {item.name}
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="sidebar-note">
          <span className="note-label">A LITTLE REMINDER</span>
          <p>Small steps every day lead to big results.</p>
          <div className="note-line"></div>
        </div>

        <div className="profile-mini">
          <div className="profile-avatar">J</div>
          <div>
            <strong>Jeffrin</strong>
            <span>Freelancer</span>
          </div>
        </div>
      </div>
    </aside>
  );
}

// Reusable header component
function Header({ theme, toggleTheme }) {
  return (
    <header className="top-header">
      <div>
        <span className="header-date">MY WORKSPACE</span>
        <h2>Dashboard</h2>
      </div>

      <div className="header-right">
        <span className="online-status">
          <span className="status-dot"></span>
          Workspace active
        </span>

        <button className="theme-button" onClick={toggleTheme}>
          <span>{theme === "light" ? "☾" : "☀"}</span>
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </div>
    </header>
  );
}

// Reusable statistics card
function StatCard({ title, value, subtitle, icon, accent }) {
  return (
    <div className={`stat-card ${accent}`}>
      <div className="stat-top">
        <span className="stat-title">{title}</span>
        <span className="stat-icon">{icon}</span>
      </div>

      <h3>{value}</h3>
      <p>{subtitle}</p>
    </div>
  );
}

// Reusable task list component
function TaskList({ tasks, onToggleTask, onDeleteTask }) {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">✓</div>
          <h4>Nothing on your list yet</h4>
          <p>Add a milestone above to get started.</p>
        </div>
      ) : (
        tasks.map((task) => (
          <div
            key={task.id}
            className={`task-item ${task.completed ? "task-completed" : ""}`}
          >
            <label className="task-check">
              <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
              />
              <span className="custom-checkbox"></span>
              <span className="task-name">{task.title}</span>
            </label>

            <span className={`task-status ${
              task.completed ? "done" : "pending"
            }`}>
              {task.completed ? "Completed" : "In progress"}
            </span>

            <button
              className="delete-button"
              onClick={() => onDeleteTask(task.id)}
              title="Delete task"
              aria-label={`Delete ${task.title}`}
            >
              ×
            </button>
          </div>
        ))
      )}
    </div>
  );
}

// Main application component
export default function App() {
  const [theme, setTheme] = useState("light");
  const [activePage, setActivePage] = useState("Overview");
  const [taskInput, setTaskInput] = useState("");

  const [tasks, setTasks] = useState([
    { id: 1, title: "Design Portfolio Homepage", completed: true },
    { id: 2, title: "Develop Responsive Layout", completed: false },
    { id: 3, title: "Complete Contact Form", completed: false }
  ]);

  // Theme switching
  const toggleTheme = () => {
    setTheme((previousTheme) =>
      previousTheme === "light" ? "dark" : "light"
    );
  };

  // Add a new task
  const handleAddTask = (event) => {
    event.preventDefault();

    if (!taskInput.trim()) return;

    const newTask = {
      id: Date.now(),
      title: taskInput.trim(),
      completed: false
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTaskInput("");
  };

  // Mark task as completed or pending
  const handleToggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  // Delete a task
  const handleDeleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((task) => task.id !== id)
    );
  };

  // Calculate dashboard statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(
    (task) => task.completed
  ).length;
  const pendingTasks = totalTasks - completedTasks;

  const progress =
    totalTasks === 0
      ? 0
      : Math.round((completedTasks / totalTasks) * 100);

  const displayedTasks =
    activePage === "My Tasks"
      ? tasks.filter((task) => !task.completed)
      : tasks;

  return (
    <div className={`app-root ${theme}`}>
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
      />

      <main className="main-area">
        <Header theme={theme} toggleTheme={toggleTheme} />

        <div className="dashboard-content">
          <section className="welcome-banner">
            <div className="welcome-text">
              <span className="welcome-tag">YOUR PERSONAL WORKSPACE</span>
              <h1>
                Hello, Jeffrin<span>.</span>
              </h1>
              <p>
                A fresh space to organise your ideas and keep
                your projects moving forward.
              </p>
            </div>

            <div className="welcome-decoration">
              <div className="decoration-circle circle-one"></div>
              <div className="decoration-circle circle-two"></div>
              <div className="decoration-card">
                <span>YOUR PROGRESS</span>
                <strong>{progress}%</strong>
                <div className="decoration-progress">
                  <span style={{ width: `${progress}%` }}></span>
                </div>
              </div>
            </div>
          </section>

          <section className="section-heading">
            <div>
              <span className="section-label">AT A GLANCE</span>
              <h2>Overview</h2>
            </div>
            <span className="today-label">Your project summary</span>
          </section>

          <section className="stats-grid">
            <StatCard
              title="Total Milestones"
              value={totalTasks}
              subtitle="Across your workspace"
              icon="▤"
              accent="stat-rose"
            />

            <StatCard
              title="Completed"
              value={completedTasks}
              subtitle="Successfully finished"
              icon="✓"
              accent="stat-green"
            />

            <StatCard
              title="Pending Tasks"
              value={pendingTasks}
              subtitle="Still in progress"
              icon="◷"
              accent="stat-peach"
            />
          </section>

          <section className="workspace-grid">
            <div className="tasks-panel">
              <div className="panel-heading">
                <div>
                  <span className="section-label">STAY ORGANIZED</span>
                  <h2>
                    {activePage === "My Tasks"
                      ? "My Pending Tasks"
                      : activePage === "My Projects"
                      ? "Project Milestones"
                      : "Project Milestones"}
                  </h2>
                  <p>Keep track of the little things that move your work forward.</p>
                </div>

                <span className="task-count">
                  {displayedTasks.length} ITEMS
                </span>
              </div>

              <form className="task-form" onSubmit={handleAddTask}>
                <input
                  type="text"
                  placeholder="What needs to be done?"
                  value={taskInput}
                  onChange={(event) => setTaskInput(event.target.value)}
                />
                <button type="submit">+ Add milestone</button>
              </form>

              <TaskList
                tasks={displayedTasks}
                onToggleTask={handleToggleTask}
                onDeleteTask={handleDeleteTask}
              />
            </div>

            <aside className="progress-panel">
              <span className="section-label">YOUR ACTIVITY</span>
              <h2>Project Progress</h2>
              <p className="progress-description">
                Every completed task brings you one step closer.
              </p>

              <div className="progress-circle">
                <svg viewBox="0 0 140 140">
                  <circle
                    className="progress-track"
                    cx="70"
                    cy="70"
                    r="58"
                  />
                  <circle
                    className="progress-value"
                    cx="70"
                    cy="70"
                    r="58"
                    style={{
                      strokeDasharray: `${(progress / 100) * 364.4} 364.4`
                    }}
                  />
                </svg>
                <div className="progress-number">
                  <strong>{progress}%</strong>
                  <span>Completed</span>
                </div>
              </div>

              <div className="progress-details">
                <div>
                  <span className="detail-dot completed-dot"></span>
                  <span>Completed</span>
                  <strong>{completedTasks}</strong>
                </div>
                <div>
                  <span className="detail-dot pending-dot"></span>
                  <span>Remaining</span>
                  <strong>{pendingTasks}</strong>
                </div>
              </div>

              <div className="progress-message">
                {pendingTasks === 0 && totalTasks > 0
                  ? "Wonderful work! All tasks are complete."
                  : "Keep going. You're making progress!"}
              </div>
            </aside>
          </section>

          <footer className="app-footer">
            <span>folio. workspace</span>
            <span>ReactJS UI Design Experiment · 09</span>
          </footer>
        </div>
      </main>
    </div>
  );
}
