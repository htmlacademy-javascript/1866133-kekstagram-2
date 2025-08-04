import { photos } from './data.js';
import { findTemplate } from './dom.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = findTemplate('picture');
const fragment = document.createDocumentFragment();


const createThumbnail = ({url, description, likes, comments}) => {

  const thumbnail = pictureTemplate.cloneNode(true);

  thumbnail.querySelector('.picture__img').src = url;
  thumbnail.querySelector('.picture__img').alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};


photos().forEach((photo) => {

  const thumbnail = createThumbnail(photo);
  fragment.appendChild(thumbnail);

});

picturesContainer.appendChild(fragment);
