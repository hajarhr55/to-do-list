let tasks = [];
function readtodolist() {
  document.getElementById("tasks").innerHTML = "";
  let index = 0;
  for (data of tasks) {
    let content = `<div class="task  ${data.isDone ? `done` : ``} ">

             
              
               <div class="task-header">
               <h4> ${data.title}</h4>
                 <div class="task-buttons">
               
              
                ${
                  data.isDone
                    ? `
                  <button onclick="isDone(${index})" class="circular-button">
                    <i class="fa-solid fa-xmark"></i>
                  </button>
                  `
                    : `
                  <button onclick="isDone(${index})" class="circular-button">
                    <i class="fa-solid fa-check"></i>
                  </button>
                  `
                }
                  
                
                  <button onclick="deleteTask(${index})" class="circular-button">
                    <i class="fa-solid fa-trash"></i>
                  </button>
                
                  <button onclick="updateTask(${index})" class="circular-button">
                    <i class="fa-solid fa-pen"></i>
                  </button>
               </div>
             </div>
               

                <div>
              <i class="fa-solid fa-calendar "></i>
              <span>${data.date}</span>
              </div>
              
              
            </div>`;
    document.getElementById("tasks").innerHTML += content;
    index++;
  }
}

function getTasksFromStorage() {
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"));
  tasks = retrievedTasks ?? [];
}

function saveTasks() {
  let tasksString = JSON.stringify(tasks);
  localStorage.setItem("tasks", tasksString);
}

getTasksFromStorage();
readtodolist();

document.getElementById("add").addEventListener("click", function () {
  var value = document.getElementById("new-task").value.trim();
  document.getElementById("new-task").value = "";
  if (!value) return;
  let time = new Date();
  let taskTime =
    time.getDate() + "/" + (time.getMonth() + 1) + "/" + time.getFullYear();

  let newobj = {
    title: `${value}`,
    date: `${taskTime}`,
    isDone: false,
  };
  tasks.push(newobj);
  saveTasks();
  readtodolist();
});

function deleteTask(index) {
  let namets = tasks[index];
  console.log(namets);
  if (confirm(`  ${namets.title} :هل انت متاكد من حذف  `)) {
    tasks.splice(index, 1);
    saveTasks();
    readtodolist();
  }
}

function updateTask(index) {
  let updatename = tasks[index];
  var updatevalue = prompt("ادخل اسم المهمة الجديدة ", updatename.title);
  if (!updatevalue) return;
  updatename.title = updatevalue;
  saveTasks();
  readtodolist();
}
function isDone(index) {
  let obj = tasks[index];

  obj.isDone = !obj.isDone;
  saveTasks();
  readtodolist();
}
