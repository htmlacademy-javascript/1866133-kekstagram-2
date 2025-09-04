import { findTemplate } from './dom.js';

const picturesContainer = document.querySelector('.pictures');
const pictureTemplate = findTemplate('picture');

const createThumbnail = ({ id, url, description, likes, comments }) => {

  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.dataset.imageId = id;

  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

const renderThumbinals = (photos) => {

  const fragment = document.createDocumentFragment();

  photos.forEach((photo) => {

    const thumbnail = createThumbnail(photo);

    fragment.appendChild(thumbnail);
  });

  picturesContainer.appendChild(fragment);
};

export { renderThumbinals, picturesContainer };
