import { renderThumbinals, picturesContainer } from './thumbnails.js';
import { debounce } from './utils.js';

const RANDOM_PHOTOS_COUNT = 10;
const RENDER_DELAY = 500;
const ACTIVE_BUTTON_CLASS_NAME = 'img-filters__button--active';

const ButtonsId = {
  RANDOM: 'filter-random',
  DISCUSSED: 'filter-discussed'
};

const filtersContainer = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
let activeButton = filtersForm.querySelector(`.${ACTIVE_BUTTON_CLASS_NAME}`);

const clearPhotosContainer = () => {
  const currentPhotos = picturesContainer.querySelectorAll('.picture');
  currentPhotos.forEach((photo) => photo.remove());
};

const compareComments = (photoA, photoB) => photoB.comments.length - photoA.comments.length;
const getRandomNumber = () => 0.5 - Math.random();

const renderFilteredThumbinals = (filteredPhotos) => {
  clearPhotosContainer();
  renderThumbinals(filteredPhotos);
};

const debounceRender = debounce(renderFilteredThumbinals, RENDER_DELAY);

const filters = (photosData) => {

  filtersContainer.classList.remove('img-filters--inactive');

  filtersForm.addEventListener('click', (evt) => {

    const pressedButton = evt.target.closest('.img-filters__button');

    if (!pressedButton || pressedButton === activeButton) {
      return;
    }

    activeButton.classList.toggle(ACTIVE_BUTTON_CLASS_NAME);
    pressedButton.classList.toggle(ACTIVE_BUTTON_CLASS_NAME);

    activeButton = pressedButton;

    switch (pressedButton.id) {
      case ButtonsId.RANDOM: debounceRender(photosData.toSorted(getRandomNumber).slice(0, RANDOM_PHOTOS_COUNT));
        break;
      case ButtonsId.DISCUSSED: debounceRender(photosData.toSorted(compareComments));
        break;
      default: debounceRender(photosData);
    }
  });

  // отрисовка превьюшек при стартовой загрузке
  return renderThumbinals(photosData);
};

export { filters };
