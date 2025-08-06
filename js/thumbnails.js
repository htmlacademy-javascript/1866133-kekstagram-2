import { findTemplate } from './dom.js';


const pictureTemplate = findTemplate('picture');

const createThumbnail = ({id, url, description, likes, comments}) => {

  const thumbnail = pictureTemplate.cloneNode(true);
  thumbnail.dataset.imageId = id;

  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;

  return thumbnail;
};

export { createThumbnail };
