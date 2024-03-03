const inputBox = document.getElementById("input-box");
const taskFieldContainer = document.getElementById("task-fields-container");
const taskFieldRemaining = document.getElementById("task-fields-remaining");
const taskFieldCompleted = document.getElementById("task-fields-completed");

function addTask() {
  if (inputBox.value === '') {
    alert("No Tasks written");
  } else {

    let li = document.createElement("li");   
    
    li.textContent = inputBox.value;

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className= 'circular__checkbox';


    li.appendChild(checkBox);
    
    

    checkBox.addEventListener('change', function() {
      if (checkBox.checked) {
        document.getElementById('task-fields-container').appendChild(li)
        document.getElementById('task-fields-completed').appendChild(li)
      } 
      else {
        document.getElementById('task-fields-completed').removeChild(li)
        document.getElementById('task-fields-container').appendChild(li)
        document.getElementById('task-fields-remaining').appendChild(li)
      }
    });

    // Insert the new li before the first child of taskFieldContainer
    if (taskFieldContainer.firstChild) {
      taskFieldContainer.insertBefore(li, taskFieldContainer.firstChild);
    } else {
      taskFieldContainer.appendChild(li);
      document.getElementById('task-fields-container').appendChild(li)
    }

    inputBox.value = "";
  }
}

const addButton = document.getElementById('form-btn');
addButton.addEventListener('click', addTask);



document.getElementById("all-btn").addEventListener("click", function() {
  document.getElementById("task-fields-container").classList.add("active");
  document.getElementById("task-fields-completed").classList.remove("active");
  document.getElementById("task-fields-remaining").classList.remove("active");
});

document.getElementById("completed-btn").addEventListener("click", function() {
  document.getElementById("task-fields-container").classList.remove("active");
  document.getElementById("task-fields-completed").classList.add("active");
  document.getElementById("task-fields-remaining").classList.remove("active");
});

document.getElementById("remaining-btn").addEventListener("click", function() {
  document.getElementById("task-fields-container").classList.remove("active");
  document.getElementById("task-fields-completed").classList.remove("active");
  document.getElementById("task-fields-remaining").classList.add("active");
});



// // new way



// const inputBox = document.getElementById("input-box");
// const taskFieldContainer = document.getElementById("task-fields-container");
// const taskFieldRemaining = document.getElementById("task-fields-remaining");



// var tasks = [];
// const inputField = document.getElementById("input-box");
// // const taskForm = document.getElementById("task-form");

// const searchInput = document.getElementById("search-input");
// searchInput.addEventListener("input", () => renderTasks());

// // const deleteIcon = 

// taskForm.addEventListener("submit", function (event) {
//   event.preventDefault();
//   addTask();
// });

// const addTask = () => {
//   let taskValue = inputField.value;
//   if (taskValue.trim() !== "") {
//     tasks.push({ task: taskValue, isCompleted: false });
//     inputField.value = "";
//     renderTasks();
//   }
// };

// const renderTasks = () => {
//   renderAllTasks();
//   renderCompletedTasks();
//   renderIncompleteTasks();
// };

// const addToList = (taskObj, index, taskList) => {
//   var searchText = searchInput.value.toLowerCase();
//   if (taskObj.task.toLowerCase().includes(searchText)) {
//     var li = document.createElement("li");
//     li.textContent = taskObj.task;
//     li.className = "tasks__list-item";

//     var buttonDiv = document.createElement("div");
//     buttonDiv.className = "tasks__button";

//     var completeBtn = document.createElement("button");
//     completeBtn.className = "tasks__button-complete";
//     completeBtn.onclick = () => {
//       toggleTaskCompletion(index);
//     };
//     buttonDiv.appendChild(completeBtn);

//     var deleteBtn = document.createElement("button");
//     deleteBtn.innerHTML = deleteIcon;
//     deleteBtn.className = "tasks__button-delete";
//     deleteBtn.onclick = () => {
//       deleteTask(index);
//     };
//     buttonDiv.appendChild(deleteBtn);

//     if (taskObj.isCompleted) {
//       li.className += " task--completed";
//     }
//     li.appendChild(buttonDiv);

//     taskList.appendChild(li);
//   }
// };

// const renderAllTasks = () => {
//   var taskList = document.getElementById("all-tasks-list");
//   taskList.innerHTML = "";

//   tasks.forEach((taskObj, index) => {
//     addToList(taskObj, index, taskList);
//   });
// };

// const renderCompletedTasks = () => {
//   var taskList = document.getElementById("completed-tasks-list");
//   taskList.innerHTML = "";

//   tasks.forEach((taskObj, index) => {
//     if (taskObj.isCompleted) {
//       addToList(taskObj, index, taskList);
//     }
//   });
// };

// const renderIncompleteTasks = () => {
//   var taskList = document.getElementById("incomplete-tasks-list");
//   taskList.innerHTML = "";

//   tasks.forEach((taskObj, index) => {
//     if (!taskObj.isCompleted) {
//       addToList(taskObj, index, taskList);
//     }
//   });
// };

// const toggleTaskCompletion = (index) => {
//   tasks[index].isCompleted = !tasks[index].isCompleted;
//   renderTasks();
// };

// function deleteTask(index) {
//   tasks.splice(index, 1);
//   renderTasks();
// }