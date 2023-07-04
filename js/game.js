setTimeout(() => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
}, 300);

const audio = new Audio('./music/Last_Of_Us.mp3');
const audioIcon = document.getElementById('audioIcon');
audio.volume = 0;

const audioButton = document.getElementById('audioButton');
audioButton.addEventListener('click', () => {
  if (audioButton.classList.contains('off')) {
    audioButton.classList.remove('off');
    audioButton.classList.add('on');

    audioIcon.classList.remove('fa-volume-xmark');
    audioIcon.classList.add('fa-volume-high');
    audio.volume = 0.75;
    audio.play();
  } else
  /* if (audioIcon.classList.contains('fa-volume-high')) {
    audioIcon.classList.remove('fa-volume-high');
    audioIcon.classList.add('fa-volume');
    audio.volume = 0.5;
  } else
  if (audioIcon.classList.contains('fa-volume')) {
    audioIcon.classList.remove('fa-volume');
    audioIcon.classList.add('fa-volume-low');
    audio.volume = 0.05;
  } */
  if (audioIcon.classList.contains('fa-volume-high')) {
    audioIcon.classList.remove('fa-volume-high');
    audioIcon.classList.add('fa-volume-low');
    audio.volume = 0.15;
  } else {
    audioButton.classList.remove('on');
    audioButton.classList.add('off');

    audioIcon.classList.remove('fa-volume-low');
    audioIcon.classList.add('fa-volume-xmark');
    audio.volume = 0;
    audio.pause();
  }
});

const wordLists = {
  Животные: ['аллигатор', 'антилопа', 'бабуин', 'барсук', 'медведь', 'кошка', 'хамелеон', 'гепард', 'шиншилла', 'кобра', 'койот', 'выхухоль', 'жираф', 'гекон', 'свинья'],
  Рыбы: ['креветка', 'мидия', 'краб', 'осьминог', 'кальмар', 'устрица', 'скумбрия', 'лосось', 'тунец', 'корюшка', 'дельфин', 'акула', 'пиранья', 'планктон', 'коралл'],
  Транспорт: ['вертолёт', 'самолёт', 'автобус', 'автомобиль', 'корабль', 'грузовик', 'паром', 'мотоцикл', 'велосипед', 'самокат', 'лодка', 'самокат', 'поезд', 'метро', 'яхта'],
  Ягоды: ['арбуз', 'барбарис', 'боярышник', 'брусника', 'голубика', 'ежевика', 'земляника', 'калина', 'кизил', 'клюква', 'морошка', 'фейхоа', 'физалис', 'шелковица', 'черёмуха'],
  Космос: ['пространство', 'звезда', 'планета', 'спутник', 'комета', 'космонавт', 'астронавт', 'ракета', 'метеорит', 'телескоп', 'скафандр', 'невесомость', 'вакуум', 'иллюминатор', 'гравитация'],
  Музыка: ['аккордеон', 'банджо', 'флагот', 'кларнет', 'флейта', 'барабан', 'гитара', 'арфа', 'мандолина', 'фортепьяно', 'орган', 'труба', 'саксофон', 'скрипка', 'виолончель'],
};
const blocksImg = document.querySelectorAll('.blockImage');
let zIndex = 1;
blocksImg.forEach((back) => {
  back.style.backgroundImage = `url('./images/changingBackground/${zIndex}.webp')`;
  back.style.zIndex = zIndex;
  zIndex += 1;
});
// blocksImg.forEach((item) => item.style.zIndex = 1);
// blocksImg[0].style.zIndex = 10;
const maxAttempts = 6;
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
const alphabetLetters = alphabet.split('');

const excludedWords = [];

function pickRandomWord(list) {
  const filteredList = list.filter((word) => !excludedWords.includes(word));
  if (filteredList.length === 0) return null;
  const index = Math.trunc(Math.random() * filteredList.length);
  return filteredList[index];
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
    // console.log(this.topic);
    console.log(this.word);
  },
  openLetter(letter) {
    if (this.openedLetters.includes(letter)) return;
    this.openedLetters.push(letter);

    const isLetterFound = this.getWordLetters().includes(letter);
    if (!isLetterFound) {
      this.attempts > blocksImg.length ? this.attempts : this.attempts += 1;
      // blocksImg.forEach((item) => item.style.zIndex = 1);
      // blocksImg[this.attempts - 1].style.zIndex = 10;
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

  openLetterHandler(letter) {
    return () => {
      gameState.openLetter(letter);
      this.render();
      if (gameState.isWin() || gameState.isGameOver()) {
        excludedWords.push(gameState.word);
      }
    };
  },

  renderKeyboard() {
    const keyboardContainer = document.getElementById('keyboard');
    if (keyboardContainer.innerHTML === '') {
      alphabetLetters.forEach((letter) => {
        const button = document.createElement('button');
        button.innerText = letter;
        button.classList.add(`button-${letter}`);
        keyboardContainer.appendChild(button);
        button.addEventListener('click', this.openLetterHandler(letter));
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

  renderBackground() {
    if (gameState.attempts !== 0) {
      blocksImg[gameState.attempts - 1].classList.remove('blockImage_opacity-0');
    }
  },

  renderHangman() {
    document.querySelector(`.hangman-${gameState.attempts}`).classList.remove('hangman_opacity-0');
  },

  renderTryAgain() {
    document.getElementById('word-guess').style.color = 'red';
  },

  renderWin() {
    document.getElementById('word-guess').style.color = 'green';
  },

  errorElement: document.createElement('p'),

  appendErrorMessage() {
    console.log('слова закончились');
    view.errorElement.classList.add('error-message');
    view.errorElement.innerText = 'К сожалению, вы уже видели все слова на эту тему. Попробуйте другую тему или перезагрузите страницу';
    document.querySelector('#parent-letters').append(view.errorElement);
  },

  render() {
    if (gameState.word === null) {
      view.appendErrorMessage();
      return;
    }
    view.renderWord();
    view.renderKeyboard();
    view.renderBackground();
    view.renderHangman();
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
    document.getElementById('Game').style.display = 'flex';
    gameTopic.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'end' });
    gameTopic.innerHTML = theme.innerHTML;
    // blocksImg.forEach((item) => item.style.zIndex = 1);
    // blocksImg[0].style.zIndex = 10;
    gameState.init();
    for (let index = 1; index <= 6; index += 1) {
      document.querySelector(`.hangman-${index}`).classList.add('hangman_opacity-0');
    }
    blocksImg.forEach((item) => {
      item.classList.add('blockImage_opacity-0');
    });
    view.render();
  });
});

const restartHandler = () => {
  gameState.init();
  // blocksImg.forEach((item) => item.style.zIndex = 1);
  // blocksImg[0].style.zIndex = 10;
  document.querySelectorAll('.letter').forEach((letter) => {
    if (letter.classList.contains('letter-appear')) {
      letter.classList.remove('letter-appear');
    }
    letter.classList.add('letter-disappear');
  });
  for (let index = 0; index <= 6; index += 1) {
    document.querySelector(`.hangman-${index}`).classList.add('hangman_opacity-0');
  }
  blocksImg.forEach((item) => {
    item.classList.add('blockImage_opacity-0');
  });
  setTimeout(view.render, 1001);
};

document.getElementById('icon-word').addEventListener('click', restartHandler);

document.addEventListener('keyup', (e) => {
  console.log(e.key);
  const letterPressed = e.key;
  if (letterPressed.match(/^[а-яА-ЯёЁ]$/)) {
    view.openLetterHandler(letterPressed)();
  }
  if (letterPressed === 'Enter') {
    if (gameState.isGameOver() || gameState.isWin()) {
      console.log('restrat');
      restartHandler();
    }
  }
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
