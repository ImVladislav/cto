// Отримуємо елементи тільки в межах секції .second-layer

const section = document.querySelector('.second-layer');
const spans = section.querySelectorAll('#player span');
const pc = section.querySelector('#pc');
const msg = section.querySelector('p');
const mainImage = section.querySelector('img[alt="normal"]');
const gameTitle = section.querySelector('.game_title');

const images = {
  rock: './images/game/1.png',
  paper: './images/game/2.png',
  scissor: './images/game/3.png',
  normal: './images/game/normal.png',
  sad: './images/game/sad.png',
  happy: './images/game/happy.png',
};

const clicked = function (event) {
  if (!section.classList.contains('noclick')) {
    section.classList.add('noclick');
    gameTitle.classList.add('hidden'); // Приховуємо заголовок

    const target = event.target.closest('span');
    target.classList.add('chosen');
    spans.forEach((span) => {
      if (target !== span) {
        span.classList.add('hidden');
      }
    });
    const random = Math.floor(Math.random() * 3);
    const pcChoice = spans[random];

    pc.textContent = '';
    pc.dataset.id = pcChoice.id;
    pc.classList.remove('hidden');

    // Додаємо зображення в span для ПК
    pc.innerHTML = `<img src="${images[pcChoice.id]}" alt="${pcChoice.id}" class="arms">`;

    setTimeout(() => results(target), 250);
  }
};

const results = function (target) {
  if (target.id === pc.dataset.id) {
    msg.textContent = 'Draw';
    mainImage.src = images.normal; // Повертаємо звичайне зображення для нічиєї
  } else if (
    (target.id === 'rock' && pc.dataset.id === 'paper') ||
    (target.id === 'paper' && pc.dataset.id === 'scissor') ||
    (target.id === 'scissor' && pc.dataset.id === 'rock')
  ) {
    msg.textContent = 'You lost';
    mainImage.src = images.sad; // Зображення для програшу
  } else {
    msg.textContent = 'You Win';
    mainImage.src = images.happy; // Зображення для перемоги
  }
  msg.classList.remove('hidden');
  setTimeout(reset, 1500);
};

const reset = function () {
  spans.forEach((span) => {
    span.classList.remove('hidden');
    span.classList.remove('chosen');
  });
  msg.classList.add('hidden');
  pc.classList.add('hidden');
  pc.innerHTML = '';
  mainImage.src = images.normal; // Повертаємо звичайне зображення
  gameTitle.classList.remove('hidden'); // Повертаємо заголовок
  setTimeout(() => {
    section.classList.remove('noclick');
  }, 500);
};

spans.forEach((span) => {
  span.addEventListener('click', clicked);
});