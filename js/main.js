import { getPhotos } from './api.js';
import { renderThumbinals, picturesContainer } from './thumbnails.js';
import { openBigPictureModal } from './open-big-picture.js';
import './img-upload-form.js';
import './validation.js';
import { showNotification } from './popup-messages.js';


let photosApi = [];

getPhotos()
  .then((photos) => {
    photosApi = JSON.parse(JSON.stringify(photos));
    renderThumbinals(photosApi);
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
    openBigPictureModal(currentThumbnail.dataset.imageId);
  }
});

export { photosApi };
