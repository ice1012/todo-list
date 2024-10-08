const form = document.querySelector('#form');
const taskInput = document.querySelector('#taskInput');
const tasksList = document.querySelector('#tasksList');
const emptyList = document.querySelector('#emptyList');

// константы для навигационной панели
const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
const currentPage = window.location.pathname.split("/").pop();

// Проходим по каждой ссылке и проверяем, совпадает ли href с текущим URL
navLinks.forEach(link => {
  const linkPage = link.getAttribute('href').split("/").pop(); 
  if (linkPage === currentPage) {
    link.classList.add('active'); // Добавляем класс 'active' к текущей странице
  }
});



form.addEventListener('submit', addTask); //Добавление задачи

tasksList.addEventListener('click', deleteTask); //Удаление задачи

tasksList.addEventListener('click', doneTask); // Выполнение задачи

if (localStorage.getItem('tasksHTML')) {
  tasksList.innerHTML = localStorage.getItem('tasksHTML');
}

function addTask(event) {
  event.preventDefault(); //отмена отправки формы

  const taskText = taskInput.value;

  //Разметка для нового задания
  const newTask = `    
    <li class="list-group-item d-flex justify-content-between task-item">
    <span class="task-title">${taskText}</span>
    <div class="task-item__buttons">
      <button type="button" data-action="done" class="btn-action">
        <img src="./img/tick.svg" alt="Done" width="18" height="18">
      </button>
      <button type="button" data-action="delete" class="btn-action">
        <img src="./img/cross.svg" alt="Done" width="18" height="18">
      </button>
    </div>
    </li>`;

  //Добавляем задачу на страницу
  tasksList.insertAdjacentHTML('beforeend', newTask);

  //Очищаем поле ввода и возвращаем курсор на Input
  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add('none');
  }

  saveHTMLtoLocalStorage();
}

function deleteTask(event) {
  if (event.target.dataset.action === 'delete') {
    const parentNode = event.target.closest('.list-group-item');
    parentNode.remove();

    if (tasksList.children.length === 1) {
      emptyList.classList.remove('none');
    }
  }

  saveHTMLtoLocalStorage();
}

function doneTask(event) {
  if (event.target.dataset.action === 'done') {
    const parentNode = event.target.closest('.list-group-item');
    const taskTitle = parentNode.querySelector('.task-title');
    taskTitle.classList.toggle('task-title--done');
  }

  saveHTMLtoLocalStorage();
}

function saveHTMLtoLocalStorage() {
  localStorage.setItem('tasksHTML', tasksList.innerHTML);
}