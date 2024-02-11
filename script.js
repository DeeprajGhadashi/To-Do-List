document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("taskInput");
    const addTaskButton = document.getElementById("addTask");
    const taskList = document.getElementById("taskList");
    const deleteTaskButton = document.getElementById("deleteTask");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function renderTasks() {
        taskList.innerHTML = "";
        tasks.forEach((task, index) => {
            const listItem = document.createElement("tr");
            listItem.innerHTML = `
                <td><input type="checkbox" name="task_${index}"></td>
                <td>${task.description}</td>
                <td>${task.category}</td>
                <td>${task.date}</td>
                <td><button onclick="editTask(${index})" class="btn">Edit</button></td>
            `;
            taskList.appendChild(listItem);
        });
    }

  
    addTaskButton.addEventListener("click", function () {
        const description = taskInput.value;
        const category = document.getElementById("addcategory").value;
        const date = document.getElementById("adddate").value;
        if (description) {
            tasks.push({ description, category, date });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
            taskInput.value = "";
        }
    });

    
    deleteTaskButton.addEventListener("click", function () {
        const checkedBoxes = document.querySelectorAll('input[type="checkbox"]:checked');
        const taskIndexesToDelete = Array.from(checkedBoxes).map(checkbox => {
            return parseInt(checkbox.name.split("_")[1]);
        });
        taskIndexesToDelete.sort((a, b) => b - a); // Sort in reverse order to avoid index issues
        taskIndexesToDelete.forEach(index => {
            tasks.splice(index, 1);
        });
        localStorage.setItem("tasks", JSON.stringify(tasks));
        renderTasks();
    });

  
    window.editTask = function (index) {
        const updatedTaskDescription = prompt("Edit Task", tasks[index].description);
        if (updatedTaskDescription !== null) {
            tasks[index].description = updatedTaskDescription;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            renderTasks();
        }
    };

    renderTasks();
});