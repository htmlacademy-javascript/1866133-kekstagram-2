import { getPhotos } from './api.js';
import { picturesContainer } from './thumbnails.js';
import { openBigPictureModal } from './open-big-picture.js';
import './img-upload-form.js';
import './validation.js';
import { filters } from './filters.js';
import { showNotification } from './popup-messages.js';

let photosData = [];

getPhotos()
  .then((data) => {
    photosData = JSON.parse(JSON.stringify(data));
    filters(photosData);
  })
  .catch(
    () => {
      showNotification('data-error');
    }
  );


picturesContainer.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');

  if (currentThumbnail) {
    evt.preventDefault();
    openBigPictureModal(currentThumbnail.dataset.imageId, photosData);
  }
});
