import { validationSchema } from '/js/validation-schema.js';
import { DESCRIPTION_MAX_LENGTH } from '/js/img-upload-form.js';

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

export { hashtagValidator, descriptionValidator, getErrorMessage };
