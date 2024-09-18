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

//Timer realization
let workTitle = document.getElementById('work');
let breakTitle = document.getElementById('break');

let workTime = 25;
let breakTime = 5;
let seconds = "00";

window.onload = () => {
  document.getElementById('minutes').innerHTML = workTime;
  document.getElementById('seconds').innerHTML = seconds;

  workTitle.classList.add('active');
}

//start Timer
function start() {
  document.getElementById('start').style.display = 'none';
  document.getElementById('reset').style.display = 'block';

  seconds = 59;
  let workMinutes = workTime - 1;
  let breakMinutes = breakTime - 1;
  
  breakCount = 0;

  let timerFunction = () => {
    document.getElementById('minutes').innerHTML = workMinutes;
    document.getElementById('seconds').innerHTML = seconds;
    seconds--;

    if (seconds === 0) {
      workMinutes--;
      if (workMinutes === -1) {
        if (breakCount % 2 === 0) {
          workMinutes = breakMinutes;
          breakCount++;

          workTitle.classList.remove('active');
          breakTitle.classList.add('active');
        } else {
          workMinutes = workTime;
          breakCount++;

          breakTitle.classList.remove('active');
          workTitle.classList.add('active');
        }
      }
      seconds = 59;
    }
  }

  setInterval(timerFunction, 1000);
}