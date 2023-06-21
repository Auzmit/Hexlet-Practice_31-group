/* // window.onbeforeunload = function () {
window.load = function () {
window.scrollTo(0, 0);
} */

/* function onRefresh() {
  const body = document.getElementById('body');
  body.scrollIntoView({ block: 'start', behavior: 'smooth', inline: 'end' });
  console.log('Hello World!');
}

if (document.readyState !== 'loading') {
  onRefresh();
} else {
  document.addEventListener('DOMContentLoaded', () => {
    onRefresh();
  });
} */

window.addEventListener('load', () => {
  document.getElementById('body').scrollIntoView({ block: 'start', behavior: 'smooth' });
  console.log('Hello World!');
}, false);
