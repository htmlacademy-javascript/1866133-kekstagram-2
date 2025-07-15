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
