let date = new Date();

/* Ищем в документе элемент с классом ".square"
   и заводим его в переменную */
let divSquare = document.querySelector('.square');

/* Создаём функцию, которая выполнится по клику */
divSquare.onclick = function() {

  /* Убираем класс "red_background" */
  divSquare.classList.remove('red_background');
  
  /* Добавляем класс "green_background" */
  divSquare.classList.add('green_background');

  /* Создаём заголовок третьей величины с текущей датой */
  divSquare.innerHTML = "<h3 class='h3_date'>" + date + "</h3>";
  
};