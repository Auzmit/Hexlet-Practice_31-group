/* document.getElementsByTagName("button").forEach((button) => {
  // if (button.innerHTML === 'а') { console.log('fasfdasdgafsdhe'); }
  button.addEventListener('mouseover', () => {
    console.log('fasfdasdgafsdhe');
  });
}); */

/* document.querySelectorAll('.button-letter').forEach((button) => {
  // if (button.innerHTML === 'а') { console.log('fasfdasdgafsdhe'); }
  button.addEventListener('click', () => {
    console.log('fasfdasdgafsdhe');
  });
}); */

// const gameTopic = document.getElementById('topic');

/* function doDifferentCubes() {
  document.querySelectorAll('.theme').forEach((theme) => {
    theme.addEventListener('click', () => {
      console.log('fasfdasdgafsdhe');
    });
  });
}
module.exports = { doDifferentCubes };
import doDifferentCubes from './different_cubes';
doDifferentCubes();
// export default doDifferentCubes;
console.log('foooo'); */

/* document.querySelectorAll('.letter').forEach((letterInWord) => {
  // const rndNmb = Math.floor(Math.random() * 6 + 1);
  letterInWord.style.backgroundImage = "url('../images/cube/6/cube_100x100_1.png')";
}); */

/* document.getElementsByTagName('button').forEach((button) => {
  button.addEventListener(() => {
    console.log('3 хуй');
  });
}); */

/* const fuckyou = document.getElementsByTagName('button');
for (let fuck of fuckyou) {
  console.log('3 хуй');
}; */

/* let observer = new MutationObserver(function(mutations) {
  mutations.forEach(function (mutation) {
          console.log(mutation);
    });
  });

  observer.observe(document.querySelector('word'), { childList: true}); */

/* .forEach(() => {
  console.log('3 хуй');
  // button.addEventListener(() => {
  // });
}); */

/* const parent = document.querySelector('.div_game-keyboard');
const children = parent.childNodes;
for (let i of children) {
    console.log();
}; */

/* document.querySelectorAll('.letter').forEach((letterInWord) => {
  // const rndNmb = Math.floor(Math.random() * 6 + 1);
  // letterInWord.style.backgroundImage = "url('../images/cube/6/cube_100x100_1.png')";
  console.log(letterInWord.innerHTML);
});

console.log('2 хуй');
 */

/* eslint-disable */



// Выбираем целевой элемент
var word = document.getElementById('parent-letters');

// Конфигурация observer (за какими изменениями наблюдать)
/* const config = {
    attributes: true,
    childList: true,
    subtree: true
}; */

// Колбэк-функция при срабатывании мутации
const callback = function(mutationsList, observer) {
    for (let mutation of mutationsList) {
        /* if (mutation.type === 'childList') {
          mutation.style.backgroundImage = "url('../images/cube/6/cube_100x100_3.png')";
        } */
        // mutation.style.backgroundImage = "url('./images/cube/6/cube_100x100_3.png')";
        var children = word.childNodes;
        children.forEach((child) => {
          const rndNmb = Math.floor(Math.random() * 6 + 1);
          child.style.backgroundImage = `url('./images/cube/6/cube_100x100_${rndNmb}.png')`;
          console.log('5 хуй');
        })
        // children[children.length - 1].style.backgroundImage = "url('./images/cube/6/cube_100x100_3.png')";
        console.log('6 хуй');
    }
};

// Создаём экземпляр наблюдателя с указанной функцией колбэка
const observer = new MutationObserver(callback);

// Начинаем наблюдение за настроенными изменениями целевого элемента
observer.observe(word, { childList: true});

// Позже можно остановить наблюдение
// observer.disconnect();