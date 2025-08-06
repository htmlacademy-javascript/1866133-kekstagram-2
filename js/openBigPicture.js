import { photos } from './data.js';
import { isEscapeKey } from './utils.js';

const body = document.querySelector('body');
const bigPicture = document.querySelector('.big-picture');
const bigPictureImg = bigPicture.querySelector('.big-picture__img > img');
const likesCount = bigPicture.querySelector('.likes-count');
const shownComments = bigPicture.querySelector('.social__comment-shown-count');
const socialCaption = bigPicture.querySelector('.social__caption');
const commentsList = bigPicture.querySelector('.social__comments');
const closeBigPictureBtn = bigPicture.querySelector('.big-picture__cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeBigPictureModal();
  }
};

const onCloseBigPictureBtnClick = (evt) => {
  evt.preventDefault();
  closeBigPictureModal();
};

const renderComments = (currentPhoto) => {

  commentsList.innerHTML = '';

  currentPhoto.comments.forEach((comment) => {
    const currentComment = `
      <li class="social__comment">
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>
    `;
    commentsList.insertAdjacentHTML('beforeend', currentComment);
  });
};

const renderFullPhoto = (imageId) => {
  const currentPhoto = photos.find((photo) => photo.id === Number(imageId));
  bigPictureImg.src = currentPhoto.url;
  bigPictureImg.alt = currentPhoto.description;
  likesCount.textContent = currentPhoto.likes;
  shownComments.textContent = currentPhoto.comments.length;
  socialCaption.textContent = currentPhoto.description;

  renderComments(currentPhoto);

  const commentCount = bigPicture.querySelector('.social__comment-count');
  commentCount.classList.add('hidden');

  const commentsLoader = bigPicture.querySelector('.comments-loader');
  commentsLoader.classList.add('hidden');
};

function openBigPictureModal (imageId) {
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
