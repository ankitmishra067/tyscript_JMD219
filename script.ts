//@ts-nocheck
document.addEventListener("DOMContentLoaded", () => {

    const taskInput = document.getElementById("taskInput") as HTMLInputElement;
    const addTaskBtn = document.getElementById("addTaskBtn") as HTMLButtonElement;
    const taskList = document.getElementById("taskList") as HTMLDivElement;
    const searchInput = document.getElementById("searchInput") as HTMLInputElement
    const taskSuggestions=document.getElementById("taskSuggestions") as HTMLDataListElement;


    const tasks: string[] = [];

    taskInput.addEventListener("keydown", function (event) {
        var taskName = taskInput.value.trim();
        if (taskName !== "" && event.key === "Enter") {
            if (tasks.indexOf(taskName) === -1) {
                addTask(taskName);
                tasks.push(taskName); 
            }else{
                alert("Already exist ")
            }
            taskInput.value = "";
        }
    })

    addTaskBtn.addEventListener("click", () => {
        const taskName = taskInput.value.trim();
        if (taskName !== "") {
            if (tasks.indexOf(taskName) === -1) {
                addTask(taskName);
                tasks.push(taskName); 
            }else{
                alert("Already Exist ")
            }
            taskInput.value = "";
        }
    });


    function addTask(name: string) {
        const taskItem = document.createElement("div");
        taskItem.classList.add("task-item");

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.classList.add("checkbox");

        checkbox.addEventListener("change",()=>{
            if(checkbox.checked){     
                statusDropdown.value = "completed"
                taskNameElement.style.textDecoration = "line-through";
            }else{
                statusDropdown.value = "in progress"
                taskNameElement.style.textDecoration = 'none';
            }
            
        })
        

        const taskNameElement = document.createElement("span");
        taskNameElement.textContent = name;

        const statusDropdown = document.createElement("select");
        statusDropdown.classList.add("task-status");
        const statusOptions = ["In Progress", "Completed"];

        for (const elem of statusOptions) {
            const option = document.createElement("option");
            option.value = elem.toLowerCase();
            option.textContent = elem;
            statusDropdown.appendChild(option);
        }

        statusDropdown.addEventListener("change", () => {
            if (statusDropdown.value === "completed") {
                checkbox.disabled=true;
                checkbox.checked = true;
                taskNameElement.style.textDecoration = "line-through";
            } else {
                checkbox.disabled=false;
                checkbox.checked = false;
                taskNameElement.style.textDecoration = "none";
            }
        });


        function updateTaskSuggestions() {
            taskSuggestions.innerHTML = '';        
            const searchTerm = searchInput.value.toLowerCase();        
            const matchingTasks = tasks.filter(task => task.toLowerCase().includes(searchTerm));        
            matchingTasks.forEach(match => {        
                const option = document.createElement('option');        
                option.value = match;       
                taskSuggestions.appendChild(option);
        
            });
        
        }
        
         
        
        searchInput.addEventListener('input', () => {
            updateTaskSuggestions();       
        });


        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => {
            taskItem.remove();
        });
        

        taskItem.appendChild(checkbox);
        taskItem.appendChild(taskNameElement);
        taskItem.appendChild(statusDropdown);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }
    
});
