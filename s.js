
let tasks = [];

function addTask() {
  const input = document.getElementById("lss")
  const taskText = input.value.trim();
    if(taskText === ""){
      alert("Please enter a Task");
      return;
    } 
    tasks.push(taskText);
    renderTasks();
    input.value = "";

    document.getElementById("listCard").style.display = "block";
}

function deleteTask(index){
  tasks.splice(index, 1);
  renderTasks();

  if(tasks.length === 0){
    document.getElementById("listCard").style.display = "none";
  }
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = "task-item";

    const taskSpan = document.createElement("span");
    taskSpan.textContent = task;

    const delBtn = document.createElement("button");

    delBtn.className = "delete";
    delBtn.onclick = () => deleteTask(index);

    const img = document.createElement("img");
    img.src = "trash.png";
    img.alt = "Delete";

    delBtn.appendChild(img);

    li.appendChild(taskSpan);
    li.appendChild(delBtn);

    list.appendChild(li);
    } 
  );
}

function toggleDiv(){
  document.getElementById("listCard").style.display = "block";
}
