// наш объет: темы - ключ, значение - список слов
const wordLists = {
  animals: ['аллигатор', 'антилопа', 'бабуин', 'барсук', 'медведь', 'кошка', 'хамелеон', 'гепард', 'шиншилла', 'кобра', 'койот', 'выхухоль', 'жираф', 'гекон', 'свинья'],
  fish: ['креветка', 'мидия', 'краб', 'осьминог', 'кальмар', 'устрица', 'скумбрия', 'лосось', 'тунец', 'корюшка', 'дельфин', 'акула', 'пиранья', 'планктон', 'коралл'],
  transport: ['вертолёт', 'самолёт', 'автобус', 'автомобиль', 'корабль', 'грузовик', 'паром', 'мотоцикл', 'велосипед', 'самокат', 'лодка', 'самокат', 'поезд', 'метро', 'яхта'],
  berries: ['арбуз', 'барбарис', 'боярышник', 'брусника', 'голубика', 'еживика', 'земляника', 'калина', 'кизил', 'клюква', 'морошка', 'фейхоа', 'физалис', 'шелковица', 'черёмуха'],
  space: ['пространство', 'звезда', 'планета', 'спутник', 'комета', 'космонавт', 'астронавт', 'ракета', 'метеорит', 'телескоп', 'скафандр', 'невесомость', 'вакуум', 'иллюминатор', 'гравитация'],
  music: ['аккордеон', 'банджо', 'флагот', 'кларнет', 'флейта', 'барабан', 'гитара', 'арфа', 'мандолина', 'фортепьяно', 'орган', 'труба', 'саксофон', 'скрипка', 'виолончель'],
};

//максимальное кол-во попыток
const maxAttempts = 6;
//наша строка - алфавит
const alphabet = 'абвгдеёжзийклмнопрстуфхцчшщъыьэюя';
//разбиваем строку алфавита на массив букв
const alphabetLetters = alphabet.split('');

//рандомайзер случайного слова из списка Math.trunc откидывает дробную часть, list это список слов по какойто конкр теме
function pickRandomWord(list) {
  const index = Math.trunc(Math.random() * list.length);
  return list[index];
}

//объект игры, который мы динамично наполняем данными
const gameState = {
  topic: null,
  word: null,
  openedLetters: [],
  attempts: 0,
  //функция инициализации мы берем topic из ссылки по параметру (по теме), припарируем ссылку, забираем параметр - который идентичен ключам в объекте
  init() {
    this.topic = new URLSearchParams(window.location.search).get('topic');
    this.word = pickRandomWord(wordLists[this.topic]);
    /* remove here code which renames topic into Russian */
  },
  //добавляем в массив выбранную букву 
  openLetter(letter) {
    this.openedLetters.push(letter);
  //буква найдена в слове есть совпадение
    const isLetterFound = this.getWordLetters().includes(letter);
    //не найдено совпадение, счетчик увеличивается на 1, если это последняя попытка, то конец игры
    if (!isLetterFound) {
      this.attempts += 1;
      if (this.isGameOver()) {
        this.endGame();
      }
    }
  },
  //слово делалим на массив букв
  getWordLetters() {
    return this.word.split('');
  },
  //после 6 попыток проигрыш
  isGameOver() {
    return this.attempts === maxAttempts;
  },
  //если не проигрыш, то победа и в разбитом на массивы букв слове есть совпадение с выбранной буквой
  isWin() {
    /* terrible close keyboard after win + 1 attempt */
    if (!this.isGameOver() && this
      .getWordLetters().every((letter) => this.openedLetters.includes(letter))) {
      this.endGame();
    }
    /*  */
    return !this.isGameOver() && this
      .getWordLetters().every((letter) => this.openedLetters.includes(letter));
  },
  //конец игры, когда игра окончена , то буквы открываются 
  endGame() {
    this.openedLetters = alphabetLetters;
  },
};

//объект визуала игры, кнопки клавиатуры []
const view = {
  /* why we have this one line?
  (it isn't used anywhere) */
  keyboardButtons: [],
//заголовок темы игры берется с помощью id в html, innerText извлекает текст
  renderTitle() {
    /* rename topic into Russian (shit but workable) */
    /* eslint-disable */
    (gameState.topic === 'animals') ? (gameState.topic = 'животные') :
      (gameState.topic === 'fish') ? (gameState.topic = 'рыбы') :
        (gameState.topic === 'transport') ? (gameState.topic = 'транспорт') :
          (gameState.topic === 'berries') ? (gameState.topic = 'ягоды') :
            (gameState.topic === 'space') ? (gameState.topic = 'космос') :
              (gameState.topic = 'музыка');
    /* eslint-enable */
    document.getElementById('topic').innerText = gameState.topic;
  },

  //объект предпологаемого слова, возвращаем первый найденный элемент по селектору
  renderWord() {
    //находим поле
    const container = document.querySelector('.word');
    //отчищаем поле
    container.innerHTML = '';
    //если буква совпадает , то она возвращается , если нет , то возвращается _
    const displayedWord = gameState.getWordLetters().map((letter) => {
      if (gameState.openedLetters.includes(letter)) {
        return letter;
      }
      return '_';
    });
    // идем по загаданному слову
    for (const letter of displayedWord) {
      //создаем текстовый контейнер, посредством создания html тэга?
      const placeholder = document.createElement('span');
      //стилизация , навесили класс и положили нужный нам текст
      placeholder.className = 'letter';
      placeholder.innerText = letter;
      //кладем по одной буквы 
      container.appendChild(placeholder);
    }
  },
//объект клавиатуры
  renderKeyboard() {
//берем элемент по id
    const keyboardContainer = document.getElementById('keyboard');
    //выводим текст
    keyboardContainer.innerHTML = '';
    //проходимся по массиву букв
    for (const letter of alphabetLetters) {
      //создаем элемент "кнопка"
      const button = document.createElement('button');
      //блокируем выбранные кнопки
      button.disabled = gameState.openedLetters.includes(letter);
      //кладем в кнопку букву
      button.innerText = letter;
      //добавляем кнопку
      keyboardContainer.appendChild(button);
      //обраюотчик события. при клике отображаем буквы
      button.addEventListener('click', () => {
        gameState.openLetter(letter);
        this.render();
      });
    }
  },
//выбираем контейнер по классу, устанавливаем атрибут, чтобы css подцепил атрибут и установил необходимые стили
  renderHangman() {
    document.querySelector('.hangman').setAttribute('data-step', gameState.attempts);
  },
//выводим кнопку и делаем слово красным
  renderTryAgain() {
    document.getElementById('gameover').style.display = 'block';
    document.getElementById('word-guess').style.color = 'red';
  },
//при победе делаем слово зеленым
  renderWin() {
<<<<<<< HEAD
    document.getElementById('win').style.display = 'block';
    document.getElementById('word-guess2').style.color = 'green';
=======
    /* add same restartButton as in the renderTryAgain */
    document.getElementById('gameover').style.display = 'block';
    /*  */
    document.getElementById('word-guess').style.color = 'green';
>>>>>>> d515eaaef4fcbc0db83f11e9f979c0e5421fef0a
  },

  //отрисовка всей страницы 
  render() {
    this.renderTitle();
    this.renderWord();
    this.renderHangman();
    this.renderKeyboard();
    if (gameState.isGameOver()) {
      this.renderTryAgain();
    }
    if (gameState.isWin()) {
      this.renderWin();
    }
  },
};

gameState.init();
view.render();
