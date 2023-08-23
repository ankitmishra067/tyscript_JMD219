//@ts-nocheck
document.addEventListener("DOMContentLoaded", function () {
    var taskInput = document.getElementById("taskInput");
    var addTaskBtn = document.getElementById("addTaskBtn");
    var taskList = document.getElementById("taskList");
    var searchInput = document.getElementById("searchInput");
    var taskSuggestions = document.getElementById("taskSuggestions");
    var tasks = [];
    taskInput.addEventListener("keydown", function (event) {
        var taskName = taskInput.value.trim();
        if (taskName !== "" && event.key === "Enter") {
            if (tasks.indexOf(taskName) === -1) {
                addTask(taskName);
                tasks.push(taskName);
            }
            else {
                alert("Already exist ");
            }
            taskInput.value = "";
        }
    });
    addTaskBtn.addEventListener("click", function () {
        var taskName = taskInput.value.trim();
        if (taskName !== "") {
            if (tasks.indexOf(taskName) === -1) {
                addTask(taskName);
                tasks.push(taskName);
            }
            else {
                alert("Already Exist ");
            }
            taskInput.value = "";
        }
    });
    function addTask(name) {
        var taskItem = document.createElement("div");
        taskItem.classList.add("task-item");
        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");
        checkbox.addEventListener("change", function () {
            if (checkbox.checked) {
                statusDropdown.value = "completed";
                taskNameElement.style.textDecoration = "line-through";
            }
            else {
                statusDropdown.value = "in progress";
                taskNameElement.style.textDecoration = 'none';
            }
        });
        var taskNameElement = document.createElement("span");
        taskNameElement.textContent = name;
        var statusDropdown = document.createElement("select");
        statusDropdown.classList.add("task-status");
        var statusOptions = ["In Progress", "Completed"];
        for (var _i = 0, statusOptions_1 = statusOptions; _i < statusOptions_1.length; _i++) {
            var elem = statusOptions_1[_i];
            var option = document.createElement("option");
            option.value = elem.toLowerCase();
            option.textContent = elem;
            statusDropdown.appendChild(option);
        }
        statusDropdown.addEventListener("change", function () {
            if (statusDropdown.value === "completed") {
                checkbox.disabled = true;
                checkbox.checked = true;
                taskNameElement.style.textDecoration = "line-through";
            }
            else {
                checkbox.disabled = false;
                checkbox.checked = false;
                taskNameElement.style.textDecoration = "none";
            }
        });
        function updateTaskSuggestions() {
            taskSuggestions.innerHTML = '';
            var searchTerm = searchInput.value.toLowerCase();
            var matchingTasks = tasks.filter(function (task) { return task.toLowerCase().includes(searchTerm); });
            matchingTasks.forEach(function (match) {
                var option = document.createElement('option');
                option.value = match;
                taskSuggestions.appendChild(option);
            });
        }
        searchInput.addEventListener('input', function () {
            updateTaskSuggestions();
        });
        var deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", function () {
            taskItem.remove();
        });
        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskNameElement);
        taskItem.appendChild(statusDropdown);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
});
