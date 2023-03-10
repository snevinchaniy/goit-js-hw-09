import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// пошук елементів
const refs = {
  inputDate: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

// кнопка не активна
refs.startBtn.disabled = true;

// параметри flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    // перевірка дати – якщо все ОК, активувати кнопку
    if (selectedDates[0] < new Date()) {
      // alert('Please choose a date in the future');
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    refs.startBtn.disabled = false;
  },
};

Notiflix.Notify.init({
  position: 'center-center',
});

// вибір дати та часу
flatpickr(refs.inputDate, options);

refs.startBtn.addEventListener('click', startChangeTime);

// старт відліку часу
let intervalTime = null;
function startChangeTime() {
  refs.startBtn.disabled = true;
  intervalTime = setInterval(changeTime, 1000);
}

// зміна часу
function changeTime() {
  const selectedDate = new Date(refs.inputDate.value).getTime();
  const currentDate = new Date().getTime();
  const differenceTime = selectedDate - currentDate;

  const timeData = convertMs(differenceTime);

  if (differenceTime <= 1) {
    return clearInterval(intervalTime);
  }
  refs.days.textContent = addLeadingZero(timeData.days);
  refs.hours.textContent = addLeadingZero(timeData.hours);
  refs.minutes.textContent = addLeadingZero(timeData.minutes);
  refs.seconds.textContent = addLeadingZero(timeData.seconds);
}

// підрахунок значень
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

// форматування часу
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
