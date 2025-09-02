const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_QUANTITY = 5;
const DESCRIPTION_MAX_LENGTH = 140;

const imageUploadForm = document.querySelector('#upload-select-image');
const hashtagInput = imageUploadForm.querySelector('.text__hashtags');
const hashtagDescription = imageUploadForm.querySelector('.text__description');

const configPristine = {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error',
};

const validationSchema = [
  {
    rule: (hashtags) => hashtags.every((hashtag) => hashtag.startsWith('#')),
    message: 'хэштег должен начинается с символа #'
  },
  {
    rule: (hashtags) => hashtags.every((hashtag) => hashtag.startsWith('#') && hashtag.length > 1),
    message: 'хэштег не может состоять только из одной решётки'
  },
  {
    rule: (hashtags) => hashtags.every((hashtag) => !hashtag.includes('#', 1)),
    message: 'хэштеги должны разделяться пробелами'
  },
  {
    rule: (hashtags) => hashtags.every((hashtag) => /^#[a-zа-яё0-9]{1,}$/i.test(hashtag.trim())),
    message: 'после решётки допустимы только буквы и числа'
  },
  {
    rule: (hashtags) => hashtags.every((hashtag) => hashtag.length <= HASHTAG_MAX_LENGTH),
    message: `максимальная длина одного хэштега ${HASHTAG_MAX_LENGTH} символов`
  },
  {
    rule: (hashtags) => !hashtags.some((hashtag, index) => hashtags.includes(hashtag, index + 1)),
    message: 'один и тот же хэштег не может быть использован дважды'
  },
  {
    rule: (hashtags) => hashtags.length <= HASHTAG_MAX_QUANTITY,
    message: `нельзя указать больше ${HASHTAG_MAX_QUANTITY} хэштегов`
  }
];

let errorMessage = '';
const getErrorMessage = () => errorMessage;

const hashtagValidator = (value) => {

  if(value.trim().length === 0) {
    return true;
  }

  const hashtags = value.trim().toLowerCase().split(/\s+/);

  const checkHashtags = validationSchema.every((currentSchema) => {
    const isValide = currentSchema.rule(hashtags);
    if (isValide) {
      return true;
    } else {
      errorMessage = currentSchema.message;
      return false;
    }
  });

  return checkHashtags;
};

const descriptionValidator = (value) => value.length <= DESCRIPTION_MAX_LENGTH;

const pristine = new Pristine(imageUploadForm, configPristine);
pristine.addValidator(hashtagInput, hashtagValidator, getErrorMessage);
pristine.addValidator(hashtagDescription, descriptionValidator, `Максимальная длина ${DESCRIPTION_MAX_LENGTH} символов`);

export { imageUploadForm, hashtagInput, hashtagDescription, pristine };
