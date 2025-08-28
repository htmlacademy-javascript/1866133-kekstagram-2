import { sendPhotos } from './api.js';
import { isEscapeKey } from './utils.js';
import { pristine } from './validation.js';
import './effects.js';
import { showNotification } from './popup-messages.js';


const ScaleSettings = {
  max: 100,
  min: 25,
  step: 25
};

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('#upload-select-image');
const imageUploadInput = imageUploadForm.querySelector('#upload-file');
const imageEditorForm = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageEditorBtn = imageEditorForm.querySelector('.img-upload__cancel');
const hashtagInput = imageEditorForm.querySelector('.text__hashtags');
const hashtagDescription = imageEditorForm.querySelector('.text__description');

const downSizeBtn = imageEditorForm.querySelector('.scale__control--smaller');
const increaseSizeBtn = imageEditorForm.querySelector('.scale__control--bigger');
const scaleControl = imageEditorForm.querySelector('.scale__control--value');
const previewPhoto = imageEditorForm.querySelector('.img-upload__preview > img');
const submitBtn = imageUploadForm.querySelector('#upload-submit');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)
    && hashtagInput !== document.activeElement
    && hashtagDescription !== document.activeElement
    && !body.contains(document.querySelector('.error__inner'))) {
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

const changeScale = (delta) => {

  const scaleValue = getScaleValue();
  const newValue = scaleValue + ScaleSettings.step * delta;

  if (newValue >= ScaleSettings.min
    && newValue <= ScaleSettings.max) {
    scaleControl.value = `${newValue}%`;
  }

  resizePhoto(scaleControl.value);
};

const onDownSizeBtnClick = () => {
  changeScale(-1);
};

const onIncreaseSizeBtnClick = () => {
  changeScale(1);
};

downSizeBtn.addEventListener('click', onDownSizeBtnClick);
increaseSizeBtn.addEventListener('click', onIncreaseSizeBtnClick);
// Масштаб изображения КОНЕЦ

closeImageEditorBtn.addEventListener('click', onCloseImageEditorBtnClick);

imageUploadInput.addEventListener('change', () => {
  imageEditorForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
});

function closeImageEditorModal() {
  window.console.log('Зашли в closeImageEditorModal');
  imageUploadForm.reset();
  pristine.reset();
  previewPhoto.style = '';
  imageEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');

  document.removeEventListener('keydown', onDocumentKeydown);
}

const blockSubmitBtn = () => {
  submitBtn.disabled = true;
};

const unBlockSubmitBtn = () => {
  submitBtn.disabled = false;
};

const setUserFormSubmit = () => {
  imageUploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValidForm = pristine.validate();

    if (isValidForm) {
      blockSubmitBtn();
      const formData = new FormData(evt.target);
      sendPhotos(formData)
        .then(() => {
          closeImageEditorModal();
          showNotification('success');
        })
        .catch(() => showNotification('error'))
        .finally(unBlockSubmitBtn);
    }
  });
};

setUserFormSubmit();

export { imageUploadForm, hashtagInput, hashtagDescription };
