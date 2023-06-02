let date = new Date();
let divSquare = document.querySelector('.square');

divSquare.onclick = function() {
  divSquare.classList.remove('red_background');
  divSquare.innerHTML = "<h3>" + date + "</h3>";
  divSquare.classList.add('green_background');
};