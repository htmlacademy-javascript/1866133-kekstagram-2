const debounce = (cb, delay) => {
  let timerId = null;
  return (...args) => {
    clearTimeout(timerId);

    timerId = setTimeout(() => cb(...args), delay);
  };
};

const isEscapeKey = (evt) => evt.key === 'Escape';

export { isEscapeKey, debounce };
