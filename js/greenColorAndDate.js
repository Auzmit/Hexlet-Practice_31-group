const b = 2;

/* Создайм константу h1, создающую заголовок первого уровня */
const h1 = document.createElement('h1');

/* Ищем в документе элемент с классом ".square" и заводим его в переменную */
const divSquare = document.querySelector('.div_square');

/* Создаём функцию, которая выполнится по клику */
divSquare.onclick = function () {
  /* Если divSquare имеет класс red_background, то... */
  if (this.classList.contains('red-background')) {
    /* Удаляем у него класс red_background */
    this.classList.remove('red-background');

    /* Добавляем ему класс green_background */
    this.classList.add('green-background');

    /* Добавляем в divSquare элемент h1, в который добаляем текущую дату */
    this.appendChild(h1);
    h1.innerHTML = new Date();
    h1.classList.add('h1_date');
  } else {
    /* ну, тут аналогично */
    this.classList.remove('green-background');
    this.classList.add('red-background');
    this.removeChild(h1);
  }
};
