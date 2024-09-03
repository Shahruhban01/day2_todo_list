document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");

    // Load tasks from local storage
    loadTasks();

    addTaskBtn.addEventListener("click", function () {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            addTask(taskText);
            taskInput.value = ""; // Clear input field
        }
    });

    taskList.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            deleteTask(e.target.parentElement);
        } else if (e.target.classList.contains("edit-btn")) {
            editTask(e.target.parentElement);
        } else if (e.target.classList.contains("task-item")) {
            toggleTaskCompleted(e.target);
        }
    });

    function addTask(taskText) {
        const taskItem = document.createElement("li");
        taskItem.className = "task-item";
        taskItem.innerHTML = `
    ${taskText}
    <button class="edit-btn">Edit</button>
    <button class="delete-btn">Delete</button>
`;
        taskList.appendChild(taskItem);
        saveTasks();
    }

    function deleteTask(taskItem) {
        taskList.removeChild(taskItem);
        saveTasks();
    }

    function editTask(taskItem) {
        const newTaskText = prompt("Edit task:", taskItem.firstChild.textContent.trim());
        if (newTaskText !== null && newTaskText.trim() !== "") {
            taskItem.firstChild.textContent = newTaskText.trim();
            saveTasks();
        }
    }

    function toggleTaskCompleted(taskItem) {
        taskItem.classList.toggle("completed");
        saveTasks();
    }

    function saveTasks() {
        const tasks = [];
        document.querySelectorAll(".task-item").forEach(function (taskItem) {
            tasks.push({
                text: taskItem.firstChild.textContent.trim(),
                completed: taskItem.classList.contains("completed")
            });
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.forEach(function (task) {
            const taskItem = document.createElement("li");
            taskItem.className = "task-item";
            if (task.completed) {
                taskItem.classList.add("completed");
            }
            taskItem.innerHTML = `
        ${task.text}
        <button class="edit-btn">Edit</button>
        <button class="delete-btn">Delete</button>
    `;
            taskList.appendChild(taskItem);
        });
    }
});
