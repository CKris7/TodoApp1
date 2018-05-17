let clock = document.querySelector('.clock');
clock.addEventListener('load', setClock);
let list = document.querySelector('.list');
let container = document.querySelector('#particles-js');
function setClock(e) {
  let date = new Date();
  let h = date.getHours();
  let m = date.getMinutes();
  let s = date.getSeconds();
  clock.innerHTML = `<h2> ${h}:${m}:${s}`;
}
setInterval(setClock, 1000);
document.addEventListener('DOMContentLoaded',getTasks);
function getTasks(){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
    tasks.forEach(function(task){
      let input = document.querySelector('.input');
      let list = document.querySelector('.list');
      let li = document.createElement('li');
      li.appendChild(document.createTextNode(task));
      let rem = document.createElement('a');
      rem.innerHTML = `   <i class="fas fa-times"></i>`;
      li.appendChild(rem);
      list.appendChild(li);
    });
  }
}
let add = document.querySelector('.add');
add.addEventListener('click', addTask);
function addTask(e) {
  let input = document.querySelector('.input');
  if (input.value === '') {
    let error = document.createElement('h1');
    error.className = 'error';
    error.appendChild(document.createTextNode('Pls Add Task'));
    error.style.background = 'rgb(58, 52, 52)';
    error.style.color = 'white';
    container.appendChild(error);
    setTimeout(clearError,2000);
    function clearError(){
      error.remove();
    }
  } else {
    let input = document.querySelector('.input');
    storeToLocalStorage(input.value);
    
    let li = document.createElement('li');
    li.appendChild(document.createTextNode(input.value));
    let rem = document.createElement('a');
    rem.innerHTML = `<i class="fas fa-times"></i>`;
    li.appendChild(rem);
    list.appendChild(li);
    rem.addEventListener('click', remoVe);
    input.value = '';
    let clear = document.querySelector('.clear');
    clear.addEventListener('click', clearAll);
    function clearAll(e) {
      localStorage.clear();
      li.remove();
    }
  }
  e.preventDefault();
}
function remoVe(e) {
  e.target.parentElement.parentElement.remove();
  
  removeLS(e.target.parentElement.parentElement);
};

function storeToLocalStorage(task){
  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  }else{
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.push(task);
  localStorage.setItem('tasks',JSON.stringify(tasks));
};


function removeLS(taskItem) {
  let tasks;
  localStorage.removeItem(taskItem);
  
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }
  tasks.forEach(function(task, index){

    if(taskItem.textContent === task){
    
    tasks.splice(index, 1);
    
    }
  });
  localStorage.setItem('tasks',JSON.stringify(tasks));
  
}












