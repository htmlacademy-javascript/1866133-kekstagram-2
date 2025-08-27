//import { findTemplate } from './dom.js';

// const ALERT_SHOW_TIME = 5000;

// const body = document.querySelector('body');

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueIdFromRangeGenerator = (min, max) => {
  const ids = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    while (ids.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }

    ids.push(currentId);

    return currentId;
  };
};

const isEnterKey = (evt) => evt.key === 'Enter';
const isEscapeKey = (evt) => evt.key === 'Escape';

// const removeElement = (element) => element.remove();


// const showErrorGetMessage = () => {
//   //window.console.log('Зашли в showErrorGetMessage');
//   const errorMessageTemplate = findTemplate('data-error');
//   const errorMessage = errorMessageTemplate.cloneNode(true);
//   body.appendChild(errorMessage);

//   setTimeout(() => {
//     removeElement(errorMessage);
//   }, ALERT_SHOW_TIME);
// };

// const showSaccesSendMessage = () => {
//   const saccesMessageTemplate = findTemplate('success');
//   const saccesMessage = saccesMessageTemplate.cloneNode(true);
//   body.appendChild(saccesMessage);

//   const successBlock = document.querySelector('.success');
//   const successButton = successBlock.querySelector('.success__button');

//   const onDocumentKeydown = (evt) => {
//     if (isEscapeKey(evt)) {
//       evt.preventDefault();
//       removeElement(successBlock);
//     }
//   };

//   const onDocumentClick = (evt) => {
//     if(!evt.target.closest('.success__inner')) {
//       removeElement(successBlock);
//     }
//   };

//   successButton.addEventListener('click', () => removeElement(successBlock));
//   document.addEventListener('keydown', onDocumentKeydown);
//   document.addEventListener('click', onDocumentClick);
// };

// const showErrorSendMessage = () => {
//   const erorMessageTemplate = findTemplate('error');
//   const errorMessage = erorMessageTemplate.cloneNode(true);
//   body.appendChild(errorMessage);

//   const errorBlock = document.querySelector('.error');
//   const errorButton = errorBlock.querySelector('.error__button');

//   const onDocumentKeydown = (evt) => {
//     if (isEscapeKey(evt)) {
//       evt.preventDefault();
//       removeElement(errorBlock);
//     }
//   };

//   const onDocumentClick = (evt) => {
//     if(!evt.target.closest('.success__inner')) {
//       removeElement(errorBlock);
//     }
//   };

//   errorButton.addEventListener('click', () => removeElement(errorBlock));
//   document.addEventListener('keydown', onDocumentKeydown);
//   document.addEventListener('click', onDocumentClick);
// };


export { getRandomInteger, createUniqueIdFromRangeGenerator, isEnterKey, isEscapeKey };
