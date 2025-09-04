import { sendPhotos } from './api.js';
import { isEscapeKey } from './utils.js';
import { imageUploadForm, hashtagInput, hashtagDescription, pristine } from './validation.js';
import { effectContainer } from './effects.js';
import './effects.js';
import { showNotification } from './popup-messages.js';

const FILE_TYPES = ['.gif', '.jpg', '.jpeg', '.png', '.webp'];

const ScaleSettings = {
  max: 100,
  min: 25,
  step: 25
};

const body = document.querySelector('body');
const imageUploadInput = imageUploadForm.querySelector('#upload-file');
const imageEditorForm = imageUploadForm.querySelector('.img-upload__overlay');
const closeImageEditorBtn = imageEditorForm.querySelector('.img-upload__cancel');
const effectsPreviewIcons = imageEditorForm.querySelectorAll('.effects__preview');

const downSizeBtn = imageEditorForm.querySelector('.scale__control--smaller');
const increaseSizeBtn = imageEditorForm.querySelector('.scale__control--bigger');
const scaleControl = imageEditorForm.querySelector('.scale__control--value');
const previewPhoto = imageEditorForm.querySelector('.img-upload__preview > img');
const submitBtn = imageUploadForm.querySelector('#upload-submit');


const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)
    && hashtagInput !== document.activeElement
    && hashtagDescription !== document.activeElement
    && !document.querySelector('.error__inner')) {
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

  const file = imageUploadInput.files[0];
  const fileName = file.name.toLowerCase();


  const matches = FILE_TYPES.some((item) => fileName.endsWith(item));

  if (matches) {
    const path = URL.createObjectURL(file);
    previewPhoto.src = path;
    effectsPreviewIcons.forEach((icon) => (icon.style.backgroundImage = `url(${path})`));
  } else {
    closeImageEditorModal();
    showNotification('error');
    body.querySelector('.error__title').textContent = 'Неверный формат файла';
  }

  document.addEventListener('keydown', onDocumentKeydown);
});

function closeImageEditorModal() {
  imageUploadForm.reset();
  pristine.reset();
  previewPhoto.style = '';
  effectContainer.classList.add('hidden');
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
