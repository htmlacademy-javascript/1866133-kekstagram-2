import { isEscapeKey } from '/js/utils.js';
import { hashtagValidator, descriptionValidator, getErrorMessage } from '/js/validators.js';

const DESCRIPTION_MAX_LENGTH = 140;

const body = document.querySelector('body');
const imageUploadForm = document.querySelector('.img-upload__form');
const imageUploadInput = imageUploadForm.querySelector('.img-upload__input'); // uploadImageControl
const imageEditorForm = imageUploadForm.querySelector('.img-upload__overlay'); //imageEditorForm
const closeImageEditorBtn = imageEditorForm.querySelector('.img-upload__cancel');
const hashtagInput = imageEditorForm.querySelector('.text__hashtags');
const hashtagDescription = imageEditorForm.querySelector('.text__description');

const configPristine = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const formAttribute = {
  method: 'POST',
  enctype: 'multipart/form-data',
  action: 'https://31.javascript.htmlacademy.pro/kekstagram'
};

for (const key in formAttribute) {
  imageUploadForm.setAttribute(key, formAttribute[key]);
}

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && hashtagInput !== document.activeElement && hashtagDescription !== document.activeElement) {
    evt.preventDefault();
    closeImageEditorModal();
  }
};

imageUploadInput.addEventListener('change', () => {
  imageEditorForm.classList.remove('hidden');
  body.classList.add('modal-open');

  document.addEventListener('keydown', onDocumentKeydown);
  closeImageEditorBtn.addEventListener('click', () => closeImageEditorModal());
});


const pristine = new Pristine(imageUploadForm, configPristine);

pristine.addValidator(hashtagInput, hashtagValidator, getErrorMessage);
pristine.addValidator(hashtagDescription, descriptionValidator, `Максимальная длина ${DESCRIPTION_MAX_LENGTH} символов`);

function closeImageEditorModal() {
  imageUploadForm.reset();
  pristine.reset();
  imageEditorForm.classList.add('hidden');
  body.classList.remove('modal-open');
  imageUploadInput.value = ''; // сброс значения поля выбора файла

  document.removeEventListener('keydown', onDocumentKeydown);
  closeImageEditorBtn.removeEventListener('click', () => closeImageEditorModal());
}

imageUploadForm.addEventListener('submit', (evt) => {

  const isValidForm = pristine.validate();

  if(!isValidForm) {
    evt.preventDefault();
  }
});

export { DESCRIPTION_MAX_LENGTH };
