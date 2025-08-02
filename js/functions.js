// Задание 5.16

const checkTimeEnough = (...data) => {
  const duration = data.at(-1);
  const times = [...data.slice(0, data.length - 1)]
    .map((time) => time.split(':')
      .map((str, index) => index === 0 ? Number(str) : Number(str) / 60)
      .reduce((sum, num) => sum + num, 0));

  const [startWorkDay, endWorkDay, startMeeting] = times;

  if (startMeeting < startWorkDay) {
    return false;
  }

  return (startMeeting + duration / 60) <= endWorkDay;
};


window.console.log('Ожидаем true, получаем - ', checkTimeEnough('08:00', '17:30', '14:00', 90)); // true
window.console.log('Ожидаем true, получаем - ', checkTimeEnough('8:00', '10:0', '8:0', 120)); // true
window.console.log('Ожидаем false, получаем - ', checkTimeEnough('08:00', '14:30', '14:00', 90)); // false
window.console.log('Ожидаем false, получаем - ', checkTimeEnough('14:00', '17:30', '08:0', 90)); // false
window.console.log('Ожидаем false, получаем - ', checkTimeEnough('8:00', '17:30', '08:00', 900)); // false


// // Задача №1
// const isNormalLength = (str, maxlength) => str.length <= maxlength;

// window.console.log('Задача 1', isNormalLength('проверяемая строка', 20));
// window.console.log('Задача 1', isNormalLength('проверяемая строка', 18));
// window.console.log('Задача 1', isNormalLength('проверяемая строка', 10));


// // Задача №2. Первый способ решения

// function isPalindrome (str = '') {
//   const normalizeStr = str.replaceAll(' ', '').toLowerCase();

//   let reverseStr = '';

//   for(let i = normalizeStr.length - 1; i >= 0; i--) {
//     reverseStr += normalizeStr[i];
//   }

//   return reverseStr === normalizeStr;
// }

// window.console.log('Задача 2, способ 1', isPalindrome('топот'));
// window.console.log('Задача 2, способ 1', isPalindrome('Лёша на полке клопа нашёл '));
// window.console.log('Задача 2, способ 1', isPalindrome('Кекс'));


// // Задача №2. Второй способ решения

// function isPalindrome2 (str = '') {
//   const normalizeStr = str.replaceAll(' ', '').toLowerCase();

//   const reverseStr = normalizeStr.split('').reverse().join('');

//   return reverseStr === normalizeStr;
// }

// window.console.log('Задача 2, способ 2', isPalindrome2('топот'));
// window.console.log('Задача 2, способ 2',isPalindrome2('Лёша на полке клопа нашёл '));
// window.console.log('Задача 2, способ 2', isPalindrome2('Кекс'));


// // Задача №3.

// function getNumber (data) {

//   let result = '';

//   if (typeof data === 'number') {
//     data = String(data);
//   }

//   for (let i = 0; i < data.length; i++) {
//     if (!Number.isNaN(parseInt(data[i], 10))) {
//       result += data[i];
//     }
//   }

//   return parseInt(result, 10);

// }

// window.console.log('Задача 3', getNumber('2023 год'));
// window.console.log('Задача 3', getNumber('ECMAScript 2022'));
// window.console.log('Задача 3', getNumber('1 кефир, 0.5 батона'));
// window.console.log('Задача 3', getNumber('агент 007'));
// window.console.log('Задача 3', getNumber('а я томат'));
// window.console.log('Задача 3', getNumber(2023));
// window.console.log('Задача 3', getNumber(-1));
// window.console.log('Задача 3', getNumber(1.5));
