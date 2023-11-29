const inputBox = document.getElementById("input-box");
const taskFieldContainer = document.getElementById("task-fields-container");
const taskFieldRemaining = document.getElementById("task-fields-remaining");

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
        document.getElementById('task-fields-completed').appendChild(li)
      } else {
        document.getElementById('task-fields-remaining').removeChild(li)
      }
    });
    
    console.log(checkBox)

    taskFieldContainer.appendChild(li);
    taskFieldRemaining.appendChild(li);

    // Insert the new li before the first child of taskFieldContainer
    // if (taskFieldContainer.firstChild) {
    //   taskFieldContainer.insertBefore(li, taskFieldContainer.firstChild);
    // } else {
    //   taskFieldContainer.appendChild(li);
    // }

    inputBox.value = "";
  }
}

const addButton = document.getElementById('form-btn');
addButton.addEventListener('click', addTask);



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

