const HASHTAG_MAX_LENGTH = 20;
const HASHTAG_MAX_QUANTITY = 5;

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

export { validationSchema };
