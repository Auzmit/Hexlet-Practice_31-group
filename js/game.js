// import exampleJsonFile from '../json/words.json' assert { type: 'json' };;

// const wordLists = exampleJsonFile;
const wordLists = {
  Животные: ['аллигатор', 'антилопа', 'бабуин', 'барсук', 'медведь', 'кошка', 'хамелеон', 'гепард', 'шиншилла', 'кобра', 'койот', 'выхухоль', 'жираф', 'гекон', 'свинья'],
  Рыбы: ['креветка', 'мидия', 'краб', 'осьминог', 'кальмар', 'устрица', 'скумбрия', 'лосось', 'тунец', 'корюшка', 'дельфин', 'акула', 'пиранья', 'планктон', 'коралл'],
  Транспорт: ['вертолёт', 'самолёт', 'автобус', 'автомобиль', 'корабль', 'грузовик', 'паром', 'мотоцикл', 'велосипед', 'самокат', 'лодка', 'самокат', 'поезд', 'метро', 'яхта'],
  Ягоды: ['арбуз', 'барбарис', 'боярышник', 'брусника', 'голубика', 'ежевика', 'земляника', 'калина', 'кизил', 'клюква', 'морошка', 'фейхоа', 'физалис', 'шелковица', 'черёмуха'],
  Космос: ['пространство', 'звезда', 'планета', 'спутник', 'комета', 'космонавт', 'астронавт', 'ракета', 'метеорит', 'телескоп', 'скафандр', 'невесомость', 'вакуум', 'иллюминатор', 'гравитация'],
  Музыка: ['аккордеон', 'банджо', 'флагот', 'кларнет', 'флейта', 'барабан', 'гитара', 'арфа', 'мандолина', 'фортепьяно', 'орган', 'труба', 'саксофон', 'скрипка', 'виолончель'],
};
// console.log(wordLists);

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
      this.attempts += 1;
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
      placeholder.innerText = letter;
      i += 1;
      placeholder.style.backgroundImage = `url('./images/cube/6/cube_100x100_${i}.png')`;
      if (i === 6) { i = 0; }
      // placeholder.classList.add(`letter-${letter}`);
      container.appendChild(placeholder);
    });
  },

  renderKeyboard() {
    const keyboardContainer = document.getElementById('keyboard');
    keyboardContainer.innerHTML = '';
    alphabetLetters.forEach((letter) => {
      const button = document.createElement('button');
      button.disabled = gameState.openedLetters.includes(letter);
      if (button.hasAttribute('disabled')) { button.style.opacity = 0; }
      button.innerText = letter;
      button.classList.add(`button-${letter}`);
      keyboardContainer.appendChild(button);

      button.addEventListener('click', () => {
        gameState.openLetter(letter);
        this.render();
      });
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
    this.renderWord();
    this.renderHangman();
    this.renderKeyboard();
    // document.getElementById('gameover').style.display = 'flex';
    if (gameState.isGameOver()) {
      this.renderTryAgain();
    }
    if (gameState.isWin()) {
      this.renderWin();
      gameState.endGame();
      this.renderKeyboard();
    }
  },
};

const gameTopic = document.getElementById('topic');
document.querySelectorAll('.theme').forEach((theme) => {
  theme.addEventListener('click', () => {
    gameTopic.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'end' });
    gameTopic.innerHTML = theme.innerHTML;
    gameState.init();
    view.render();
  });
});

document.querySelector('.buttonStartAgain').addEventListener('click', () => {
  gameState.init();
  view.render();
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
