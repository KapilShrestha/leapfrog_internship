const inputBox = document.getElementById("input-box");
const taskFieldContainer = document.getElementById("task-fields-container");

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
    console.log(li)

    // Insert the new li before the first child of taskFieldContainer
    if (taskFieldContainer.firstChild) {
      taskFieldContainer.insertBefore(li, taskFieldContainer.firstChild);
    } else {
      taskFieldContainer.appendChild(li);
    }

    inputBox.value = "";
  }
}

const addButton = document.getElementById('form-btn');
addButton.addEventListener('click', addTask);
