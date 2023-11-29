const allTodoList=[]
const completedList=[]
const remainingList=[]

const inputBox = document.getElementById("input-box");
const taskFieldContainer = document.getElementById("task-fields-container");
const taskFieldRemaining = document.getElementById("task-fields-remaining");
const taskFieldCompleted = document.getElementById("task-fields-completed");

function addTask(){
    if (inputBox.value === '') {
            alert("No Tasks written");
    } 
    else{
        const task={text:inputBox.value, isCompleted:false}
        allTodoList.push(task)
        remainingList.push(task)

    }
}

const li = document.createElement("li");
    li.textContent = inputBox.value;

    let checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className= 'circular__checkbox';
    li.appendChild(checkBox);

    taskFieldContainer.appendChild(li)
    console.log()

// allTodoList.forEach(function(item, index){
    
// })

const addButton = document.getElementById('form-btn');
addButton.addEventListener('click', addTask);


// function addTask() {
//   if (inputBox.value === '') {
//     alert("No Tasks written");
//   } else {

//     let li = document.createElement("li");
//     console.log(li,'1')   
    
//     li.textContent = inputBox.value;
//     console.log(li,'2')

//     let checkBox = document.createElement('input');
//     checkBox.type = 'checkbox';
//     checkBox.className= 'circular__checkbox';


//     li.appendChild(checkBox);
    
    

//     checkBox.addEventListener('change', function() {
//         if (checkBox.checked) {
//           console.log(li,'3', taskFieldContainer)
//         document.getElementById('task-fields-completed').appendChild(li.cloneNode(true))
//       } 
//       else {
//         document.getElementById('task-fields-completed').removeChild(li)
//         document.getElementById('task-fields-remaining').appendChild(li.cloneNode(true))
//       }
      
//     });


//     taskFieldContainer.appendChild(li.cloneNode(true))
//     taskFieldRemaining.appendChild(li)

//     // Insert the new li before the first child of taskFieldContainer
//     // if (taskFieldContainer.firstChild) {
//     //   taskFieldContainer.insertBefore(li.cloneNode(true), taskFieldContainer.firstChild);
//     // } else {
//     //   taskFieldContainer.appendChild(li.cloneNode(true));
//     //   document.getElementById('task-fields-remaining').appendChild(li.cloneNode(true))
//     // }

//     inputBox.value = "";
//   }
// }

// const addButton = document.getElementById('form-btn');
// addButton.addEventListener('click', addTask);



// document.getElementById("all-btn").addEventListener("click", function() {
//   document.getElementById("task-fields-container").classList.add("active");
//   document.getElementById("task-fields-completed").classList.remove("active");
//   document.getElementById("task-fields-remaining").classList.remove("active");
// });

// document.getElementById("completed-btn").addEventListener("click", function() {
//   document.getElementById("task-fields-container").classList.remove("active");
//   document.getElementById("task-fields-completed").classList.add("active");
//   document.getElementById("task-fields-remaining").classList.remove("active");
// });

// document.getElementById("remaining-btn").addEventListener("click", function() {
//   document.getElementById("task-fields-container").classList.remove("active");
//   document.getElementById("task-fields-completed").classList.remove("active");
//   document.getElementById("task-fields-remaining").classList.add("active");
// });