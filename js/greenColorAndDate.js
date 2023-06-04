/* Создайм константу h3, создающую заголовок третьего уровня */
const h3 = document.createElement('h3');

/* Ищем в документе элемент с классом ".square" и заводим его в переменную */
let divSquare = document.querySelector('.div_square');

/* Создаём функцию, которая выполнится по клику */
divSquare.onclick = function() {

  /* Если divSquare имеет класс red_background, то... */
  if (this.classList.contains("red-background")) {

    /* Удаляем у него класс red_background */
    this.classList.remove("red-background");

    /* Добавляем ему класс green_background */
    this.classList.add("green-background");

    /* Добавляем в divSquare элемент h3, в который добаляем текущую дату */
    this.appendChild(h3);
    h3.innerHTML = new Date();
    h3.classList.add('h3_date');
    // console.log(divSquare.children);
  } else {

    /* ну, тут аналогично */
    this.classList.remove("green-background");
    this.classList.add("red-background");
    this.removeChild(h3);

    // divSquare.removeChild(h3);
  }
};