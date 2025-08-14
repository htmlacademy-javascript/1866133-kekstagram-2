import { photos } from './data.js';
import { createThumbnail } from './thumbnails.js';
import { openBigPictureModal } from './open-big-picture.js';
import './img-upload-form.js';

const picturesContainer = document.querySelector('.pictures');
const fragment = document.createDocumentFragment();


photos.forEach((photo) => {

  const thumbnail = createThumbnail(photo);

  fragment.appendChild(thumbnail);

});

picturesContainer.appendChild(fragment);

picturesContainer.addEventListener('click', (evt) => {
  const currentThumbnail = evt.target.closest('.picture');

  if(currentThumbnail) {
    evt.preventDefault();
    openBigPictureModal(currentThumbnail.dataset.imageId);
  }
});

