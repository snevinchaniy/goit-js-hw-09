//отримання випадкового кольору
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

// пошук елементів
const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};

//слухачі
refs.startBtn.addEventListener('click', startChangeColor);
refs.stopBtn.addEventListener('click', stopChangeColor);

refs.stopBtn.disabled = true;
let intervalChangeColor = null;

//старт зміни кольору
function startChangeColor() {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  intervalChangeColor = setInterval(changeColor, 1000);
}

//стоп зміни кольору
function stopChangeColor() {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
  clearIntervalChangeColor();
}

//зміна кольору
function changeColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

//очистка інтервалу зміни кольору
function clearIntervalChangeColor() {
  clearInterval(intervalChangeColor);
}
