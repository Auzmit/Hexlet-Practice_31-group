// import exampleJsonFile from '../json/words.json' assert { type: 'json' };;
// const wordLists = exampleJsonFile;
// console.log(wordLists);

setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, 300);

const wordLists = {
  Животные: ['аллигатор', 'антилопа', 'бабуин', 'барсук', 'медведь', 'кошка', 'хамелеон', 'гепард', 'шиншилла', 'кобра', 'койот', 'выхухоль', 'жираф', 'гекон', 'свинья'],
  Рыбы: ['креветка', 'мидия', 'краб', 'осьминог', 'кальмар', 'устрица', 'скумбрия', 'лосось', 'тунец', 'корюшка', 'дельфин', 'акула', 'пиранья', 'планктон', 'коралл'],
  Транспорт: ['вертолёт', 'самолёт', 'автобус', 'автомобиль', 'корабль', 'грузовик', 'паром', 'мотоцикл', 'велосипед', 'самокат', 'лодка', 'самокат', 'поезд', 'метро', 'яхта'],
  Ягоды: ['арбуз', 'барбарис', 'боярышник', 'брусника', 'голубика', 'ежевика', 'земляника', 'калина', 'кизил', 'клюква', 'морошка', 'фейхоа', 'физалис', 'шелковица', 'черёмуха'],
  Космос: ['пространство', 'звезда', 'планета', 'спутник', 'комета', 'космонавт', 'астронавт', 'ракета', 'метеорит', 'телескоп', 'скафандр', 'невесомость', 'вакуум', 'иллюминатор', 'гравитация'],
  Музыка: ['аккордеон', 'банджо', 'флагот', 'кларнет', 'флейта', 'барабан', 'гитара', 'арфа', 'мандолина', 'фортепьяно', 'орган', 'труба', 'саксофон', 'скрипка', 'виолончель'],
};
const blocksImg = document.querySelectorAll('.blockImage');
blocksImg.forEach((item) => item.style.zIndex = 1);
blocksImg[0].style.zIndex = 10;
const maxAttempts = 6;
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const alphabetLetters = alphabet.split('');

function pickRandomWord(list) {
  const index = Math.trunc(Math.random() * list.length);
  return list[index];
}

const gameState = {
  topic: null,
  word: null,
  openedLetters: [],
  attempts: 0,
  init() {
    this.attempts = 0;
    this.openedLetters = [];
    this.topic = document.getElementById('topic').innerHTML;
    this.word = pickRandomWord(wordLists[this.topic]);
    document.getElementById('word-guess').style.color = 'rgba(244, 231, 156, 0.693)';
    document.querySelector('.hangman').style.opacity = '100%';
    /* for testing: */
    console.log(this.topic);
    console.log(this.word);
  },
  openLetter(letter) {
    this.openedLetters.push(letter);

    const isLetterFound = this.getWordLetters().includes(letter);
    if (!isLetterFound) {
      this.attempts > blocksImg.length ? this.attempts : this.attempts += 1;
      blocksImg.forEach((item) => item.style.zIndex = 1);
      blocksImg[this.attempts - 1].style.zIndex = 10;
      if (this.isGameOver()) {
        this.endGame();
      }
    }
  },
  getWordLetters() {
    return this.word.split('');
  },
  isGameOver() {
    return this.attempts === maxAttempts;
  },
  isWin() {
    return !this.isGameOver() && this
      .getWordLetters().every((letter) => this.openedLetters.includes(letter));
  },
  endGame() {
    this.openedLetters = alphabetLetters;
  },
};

const view = {
  renderWord() {
    const container = document.querySelector('.word');
    let doNeedAppearClass = false;
    if (container.firstChild) {
      if (container.firstChild.classList.contains('letter-disappear')) {
        doNeedAppearClass = true;
      }
    }
    container.innerHTML = '';
    const displayedWord = gameState.getWordLetters().map((letter) => {
      if (gameState.openedLetters.includes(letter)) {
        return letter;
      }
      return '';
    });
    let i = 0;
    displayedWord.forEach((letter) => {
      const placeholder = document.createElement('span');
      placeholder.className = 'letter';
      if (doNeedAppearClass) { placeholder.classList.add('letter-appear'); }
      placeholder.innerText = letter;
      i += 1;
      placeholder.style.backgroundImage = `url('./images/cube/6/cube_100x100_${i}.png')`;
      if (i === 6) { i = 0; }
      container.appendChild(placeholder);
    });
  },

  renderKeyboard() {
    const keyboardContainer = document.getElementById('keyboard');
    if (keyboardContainer.innerHTML === '') {
      alphabetLetters.forEach((letter) => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.classList.add(`button-${letter}`);
        keyboardContainer.appendChild(button);
        button.addEventListener('click', () => {
          gameState.openLetter(letter);
          this.render();
        });
      });
    }
    alphabetLetters.forEach((letter) => {
      const button = document.querySelector(`.button-${letter}`);
      button.disabled = gameState.openedLetters.includes(letter);
      if (button.hasAttribute('disabled')) {
        button.style.opacity = 0;
      } else { button.style.opacity = 1; }
    });
  },

  renderHangman() {
  // implement this
  // use gameState.attempts and maxAttempts
    document.querySelector('.hangman').setAttribute('data-step', gameState.attempts);
  },

  renderTryAgain() {
    document.getElementById('word-guess').style.color = 'red';
  },

  renderWin() {
    document.getElementById('word-guess').style.color = 'green';
  },

  render() {
    view.renderWord();
    view.renderHangman();
    view.renderKeyboard();
    if (gameState.isGameOver()) {
      view.renderTryAgain();
    }
    if (gameState.isWin()) {
      view.renderWin();
      gameState.endGame();
      view.renderKeyboard();
    }
  },
};

const gameTopic = document.getElementById('topic');
document.querySelectorAll('.theme').forEach((theme) => {
  theme.addEventListener('click', () => {
    // document.getElementById('body').style.height = '200vh';
    document.getElementById('Game').style.display = 'flex';
    gameTopic.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'end' });
    gameTopic.innerHTML = theme.innerHTML;
    blocksImg.forEach((item) => item.style.zIndex = 1);
    blocksImg[0].style.zIndex = 10;
    gameState.init();
    view.render();
  });
});

document.getElementById('icon-word').addEventListener('click', () => {
  gameState.init();
  blocksImg.forEach((item) => item.style.zIndex = 1);
  blocksImg[0].style.zIndex = 10;
  // document.body.className = '';
  document.querySelectorAll('.letter').forEach((letter) => {
    if (letter.classList.contains('letter-appear')) {
      letter.classList.remove('letter-appear');
    }
    letter.classList.add('letter-disappear');
  });
  // view.render();
  setTimeout(view.render, 1001);
});

const body = document.getElementById('body');
document.getElementById('icon-category').addEventListener('click', () => {
  body.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'end' });
});

const rules = document.querySelector('.rules_header');
rules.addEventListener('mouseover', () => {
  document.querySelector('.rule').style.opacity = 1;
});
rules.addEventListener('mouseout', () => {
  document.querySelector('.rule').style.opacity = 0;
});
