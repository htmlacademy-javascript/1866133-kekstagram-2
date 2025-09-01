// const getRandomInteger = (a, b) => {
//   const lower = Math.ceil(Math.min(a, b));
//   const upper = Math.floor(Math.max(a, b));
//   const result = Math.random() * (upper - lower + 1) + lower;
//   return Math.floor(result);
// };

// const createUniqueIdFromRangeGenerator = (min, max) => {
//   const ids = [];

//   return function () {
//     let currentId = getRandomInteger(min, max);
//     while (ids.includes(currentId)) {
//       currentId = getRandomInteger(min, max);
//     }

//     ids.push(currentId);

//     return currentId;
//   };
// };

const debounce = (cb, delay) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => cb(...args), delay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, debounce };
