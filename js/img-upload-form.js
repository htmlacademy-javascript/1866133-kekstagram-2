import { isEscapeKey } from './utils.js';
import { pristine } from './validation.js';
import './effects.js';


const SCALE_SETTINGS = {
  max: 100,
  min: 25,
  step: 25
};

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input');
const imageEditorForm = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageEditorBtn = imageEditorForm.querySelector('.img-upload__cancel');
const hashtagInput = imageEditorForm.querySelector('.text__hashtags');
const hashtagDescription = imageEditorForm.querySelector('.text__description');

const downSizeBtn = imageEditorForm.querySelector('.scale__control--smaller');
const increaseSizeBtn = imageEditorForm.querySelector('.scale__control--bigger');
const scaleControl = imageEditorForm.querySelector('.scale__control--value');
const previewPhoto = imageEditorForm.querySelector('.img-upload__preview > img');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && hashtagInput !== document.activeElement && hashtagDescription !== document.activeElement) {
    evt.preventDefault();
    closeImageEditorModal();
  }
};

const onCloseImageEditorBtnClick = () => closeImageEditorModal();

// Масштаб изображения НАЧАЛО
const resizePhoto = (val) => {
  previewPhoto.style.transform = `scale(${parseInt(val, 10) / 100})`;
};

const getScaleValue = () => parseInt(scaleControl.value, 10);

const onDownSizeBtnClick = () => {
  const scaleValue = getScaleValue();
  if(scaleValue > SCALE_SETTINGS.min) {
    scaleControl.value = `${scaleValue - SCALE_SETTINGS.step}%`;
  }
  resizePhoto(scaleControl.value);
};

const onIncreaseSizeBtnClick = () => {
  const scaleValue = getScaleValue();
  if(scaleValue < SCALE_SETTINGS.max) {
    scaleControl.value = `${scaleValue + SCALE_SETTINGS.step}%`;
  }
  resizePhoto(scaleControl.value);
};

const resetPhotoScale = () => {
  previewPhoto.style.transform = 'scale(1)';
  downSizeBtn.removeEventListener('click', onDownSizeBtnClick);
  increaseSizeBtn.removeEventListener('click', onIncreaseSizeBtnClick);
};
// Масштаб изображения КОНЕЦ

imageUploadInput.addEventListener('change', () => {
  imageEditorForm.classList.remove('hidden');
  body.classList.add('modal-open');

  downSizeBtn.addEventListener('click', onDownSizeBtnClick);
  increaseSizeBtn.addEventListener('click', onIncreaseSizeBtnClick);
  document.addEventListener('keydown', onDocumentKeydown);
  closeImageEditorBtn.addEventListener('click', onCloseImageEditorBtnClick);
});

function closeImageEditorModal() {
  imageUploadForm.reset();
  pristine.reset();
  resetPhotoScale();
  imageEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
  closeImageEditorBtn.removeEventListener('click', onCloseImageEditorBtnClick);
}

imageUploadForm.addEventListener('submit', (evt) => {

  const isValidForm = pristine.validate();

  if(!isValidForm) {
    evt.preventDefault();
  }
});

export { imageUploadForm, hashtagInput, hashtagDescription };
