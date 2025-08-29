import { renderComments, clearComments } from './render-comments.js';
import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img > img');
const likesCount = bigPicture.querySelector('.likes-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsTotalCount = bigPicture.querySelector('.social__comment-total-count');
const closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

let photos = [];

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    clearComments();
    closeBigPictureModal();
  }
};

const onCloseBigPictureBtnClick = (evt) => {
  evt.preventDefault();
  clearComments();
  closeBigPictureModal();
};


const renderFullPhoto = (imageId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(imageId));
  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  commentsTotalCount.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto.comments);
};

function openBigPictureModal (imageId, photosData) {
  photos = photosData;
  body.classList.add('modal-open');
  bigPicture.classList.remove('hidden');
  renderFullPhoto(imageId);

  document.addEventListener('keydown', onDocumentKeydown);
  closeBigPictureBtn.addEventListener('click', onCloseBigPictureBtnClick);
}

function closeBigPictureModal () {
  body.classList.remove('modal-open');
  bigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeBigPictureBtn.removeEventListener('click', onCloseBigPictureBtnClick);
}

export { openBigPictureModal };
