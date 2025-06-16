let tasks = [];

function addTask() {
    const input = document.getElementById("lss");
    const taskText = input.value.trim();
    if (taskText === "") {
        alert("Please enter a Task");
        return;
    }
    tasks.push(taskText);
    renderTasks();
    input.value = "";

    document.getElementById("listCard").style.display = "block";
}

function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();

    if (tasks.length === 0) {
        document.getElementById("listCard").style.display = "none";
    }
}

function moveTaskUp(index) {
    if (index > 0) {
        [tasks[index - 1], tasks[index]] = [tasks[index], tasks[index - 1]];
        renderTasks();
    }
}

function moveTaskDown(index) {
    if (index < tasks.length - 1) {
        [tasks[index], tasks[index + 1]] = [tasks[index + 1], tasks[index]];
        renderTasks();
    }
}

function renderTasks() {
    const list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.className = "task-item"; 

        const taskSpan = document.createElement("span");
        taskSpan.textContent = `${index + 1}. ${task}`;
        taskSpan.style.flex = "1"; 

        const editBtn = document.createElement("button");
        editBtn.className = "edit";
        const editImg = document.createElement("img");
        editImg.src = "pencil.png";
        editImg.alt = "Edit";
        editImg.style.width = "16px";
        editImg.style.height = "16px";
        editBtn.appendChild(editImg);

        const upBtn = document.createElement("button");
        upBtn.className = "move-up";
        upBtn.innerHTML = "⬆️";
        upBtn.onclick = () => moveTaskUp(index);

        const delBtn = document.createElement("button");
        delBtn.className = "delete";
        delBtn.onclick = () => deleteTask(index);
        const trashImg = document.createElement("img");
        trashImg.src = "trash.png";
        trashImg.alt = "Delete";
        trashImg.style.width = "16px";
        trashImg.style.height = "16px";
        delBtn.appendChild(trashImg);

        const downBtn = document.createElement("button");
        downBtn.className = "move-down";
        downBtn.innerHTML = "⬇️";
        downBtn.onclick = () => moveTaskDown(index);

        const topRowActions = document.createElement("div");
        topRowActions.className = "top-row-actions"; 
        topRowActions.appendChild(editBtn);
        topRowActions.appendChild(upBtn);

        const bottomRowActions = document.createElement("div");
        bottomRowActions.className = "bottom-row-actions"; 
        bottomRowActions.appendChild(delBtn); 
        bottomRowActions.appendChild(downBtn);

        const actionGridContainer = document.createElement("div");
        actionGridContainer.className = "action-grid-container"; 
        actionGridContainer.appendChild(topRowActions);
        actionGridContainer.appendChild(bottomRowActions);

        editBtn.onclick = () => {
            const input = document.createElement("textarea");
            input.type = "text";
            input.value = task;
            input.className = "edit-input";
            input.rows = 1;
            input.style.width = "100%";
            input.style.resize = "none";
            input.style.flex = "1";

            input.addEventListener("input", () => {
                input.style.height = "auto";
                input.style.height = input.scrollHeight + "px";
            });

            li.replaceChild(input, taskSpan);
            input.focus();

            editImg.src = "accept.png";
            editImg.alt = "Save";

            editBtn.onclick = () => {
                const newTask = input.value.trim();
                if (newTask !== "") {
                    tasks[index] = newTask;
                    renderTasks();
                }
            };
        };

        li.appendChild(taskSpan);
        li.appendChild(actionGridContainer); 

        list.appendChild(li);
    });
}
