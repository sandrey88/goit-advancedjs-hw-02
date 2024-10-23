import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const form = document.querySelector('.form');

form.addEventListener('submit', event => {
  event.preventDefault();

  // Отримання значення затримки і стану з форми
  const delay = parseInt(event.target.delay.value);
  const state = event.target.state.value;

  // Створення промісу
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (state === 'fulfilled') {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });

  // Обробка виконання або відхилення промісу
  promise
    .then(delay => {
      iziToast.success({
        title: '✅ Success',
        message: `Fulfilled promise in ${delay}ms`,
        icon: false,
        position: 'topRight',
        timeout: 3000,
      });
    })
    .catch(delay => {
      iziToast.error({
        title: '❌ Error',
        message: `Rejected promise in ${delay}ms`,
        icon: false,
        position: 'topRight',
        timeout: 3000,
      });
    });

  // Очищення поля вводу після натискання кнопки
  event.target.delay.value = '';
});
