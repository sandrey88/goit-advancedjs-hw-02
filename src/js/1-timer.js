import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const selector = document.querySelector('#datetime-picker');
const button = document.querySelector('button');
button.disabled = true;
let userSelectedDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];
    console.log(userSelectedDate);

    if (userSelectedDate > new Date()) {
      button.disabled = false;
      calculateDifference();
    } else {
      button.disabled = true;
      iziToast.show({
        title: 'Warning',
        message: 'Please choose a date in the future',
        color: 'red',
      });
    }
  },
};

const fp = flatpickr(selector, options);

button.addEventListener('click', startTimer);

function startTimer(evt) {
  evt.preventDefault();

  // Вимкнення інпуту та кнопки після старту
  button.disabled = true;
  selector.disabled = true;

  let interval = setInterval(function () {
    let differenceMs = userSelectedDate - Date.now();
    if (differenceMs >= 0) {
      calculateDifference();
    } else {
      clearInterval(interval);
      updateTimer({ days: '00', hours: '00', minutes: '00', seconds: '00' });

      // Відновлення інпуту після завершення таймера
      selector.disabled = false;

      iziToast.show({
        title: 'Done',
        message: 'Countdown finished!',
        color: 'green',
      });
    }
  }, 1000);
}

function calculateDifference() {
  const differenceMs = userSelectedDate - Date.now();
  const convertedTime = convertMs(differenceMs);
  return updateTimer(convertedTime);
}

function updateTimer(convertedTime) {
  document.querySelector('[data-days]').innerHTML = convertedTime.days;
  document.querySelector('[data-hours]').innerHTML = convertedTime.hours;
  document.querySelector('[data-minutes]').innerHTML = convertedTime.minutes;
  document.querySelector('[data-seconds]').innerHTML = convertedTime.seconds;
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
