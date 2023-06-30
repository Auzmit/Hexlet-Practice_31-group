document.querySelector('.goto__about_game').addEventListener('click', () => {
  console.log('asdf');
  document.getElementById('about_game').scrollIntoView({ block: 'start', behavior: 'smooth' });
});

document.querySelector('.goto__about_us').addEventListener('click', () => {
  console.log('asdf');
  document.getElementById('about_us').scrollIntoView({ block: 'start', behavior: 'smooth' });
});

document.querySelector('.goto__introduction').addEventListener('click', () => {
  console.log('asdf');
  document.getElementById('introduction').scrollIntoView({ block: 'start', behavior: 'smooth' });
});
