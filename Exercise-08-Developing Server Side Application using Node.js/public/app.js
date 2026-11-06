
// Experiment 6: Building a Web App with JavaScript Functions

// Application state
let tasks = [];
let currentFilter = "all";

// Get page elements
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");
const emptyMessage = document.getElementById("emptyMessage");
const filterButtons = document.querySelectorAll(".filter-btn");

// Create and return a new task object
function createTask(text) {
    return {
        id: Date.now(),
        text: text,
        done: false
    };
}

// Add a new task
function addTask(text) {
    tasks.push(createTask(text));
    saveAndRender();
}

// Mark a task as completed or open
function toggleTask(id) {

    tasks = tasks.map(function (task) {

        return task.id === id
            ? { ...task, done: !task.done }
            : task;

    });

    saveAndRender();
}

// Delete a task
function deleteTask(id) {

    tasks = tasks.filter(function (task) {
        return task.id !== id;
    });

    saveAndRender();
}

// Return tasks based on the selected filter
function getVisible() {

    if (currentFilter === "open") {

        return tasks.filter(function (task) {
            return !task.done;
        });

    }

    if (currentFilter === "completed") {

        return tasks.filter(function (task) {
            return task.done;
        });

    }

    return tasks;
}

// Count tasks that are not completed
function countOpen() {

    return tasks.filter(function (task) {
        return !task.done;
    }).length;

}

// Create and return one task list item
function taskItem(task) {

    const item = document.createElement("li");

    item.className = "task-item";

    if (task.done) {
        item.classList.add("completed");
    }

    // Checkbox
    const checkbox = document.createElement("input");

    checkbox.type = "checkbox";
    checkbox.checked = task.done;

    checkbox.setAttribute(
        "aria-label",
        "Mark task as completed"
    );

    checkbox.addEventListener("change", function () {
        toggleTask(task.id);
    });

    // Task text
    const text = document.createElement("span");

    text.className = "task-text";
    text.textContent = task.text;

    // Delete button
    const deleteButton = document.createElement("button");

    deleteButton.type = "button";
    deleteButton.className = "delete-btn";
    deleteButton.textContent = "Delete";

    deleteButton.addEventListener("click", function () {
        deleteTask(task.id);
    });

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(deleteButton);

    return item;
}

// Save tasks and redraw the page
function saveAndRender() {

    localStorage.setItem(
        "tasks",
        JSON.stringify(tasks)
    );

    renderTasks();
}

// Draw the visible task list
function renderTasks() {

    list.innerHTML = "";

    const visibleTasks = getVisible();

    visibleTasks.forEach(function (task) {

        list.appendChild(taskItem(task));

    });

    counter.textContent = countOpen() + " left";

    emptyMessage.hidden = visibleTasks.length !== 0;

    if (visibleTasks.length === 0) {

        if (currentFilter === "open") {

            emptyMessage.textContent = "No open tasks.";

        } else if (currentFilter === "completed") {

            emptyMessage.textContent = "No completed tasks.";

        } else {

            emptyMessage.textContent =
                "No tasks yet. Add your first task!";

        }
    }
}

// Handle form submission
function handleSubmit(event) {

    event.preventDefault();

    const text = input.value.trim();

    if (text !== "") {
        addTask(text);
    }

    input.value = "";
    input.focus();
}

// Change the current filter
function setFilter(filter) {

    currentFilter = filter;

    filterButtons.forEach(function (button) {

        button.classList.toggle(
            "active",
            button.dataset.filter === currentFilter
        );

    });

    renderTasks();
}

// Load saved tasks from localStorage
function loadTasks() {

    try {

        const savedTasks = JSON.parse(
            localStorage.getItem("tasks")
        );

        tasks = Array.isArray(savedTasks)
            ? savedTasks
            : [];

    } catch (error) {

        tasks = [];

    }

    renderTasks();
}

// Connect the form to the submit handler
form.addEventListener("submit", handleSubmit);

// Connect filter buttons
filterButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        setFilter(button.dataset.filter);

    });

});

// Start the application
loadTasks();
