const MESSAGES = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const NAMES = [
  'Саша',
  'Света',
  'Максим',
  'Игорь',
  'Лена',
  'Арина',
  'Лариса',
  'Юра',
  'Вова',
  'Стас',
  'Маша',
  'Кирилл',
  'Олег',
  'Леша',
  'Вася',
  'Коля',
  'Толя',
  'Сергей',
  'Слава',
  'Юля',
];

const MIN_LIKES = 15;
const MAX_LIKES = 200;

const MIN_COMMENTS = 0;
const MAX_COMMENTS = 30;

const COUNT_PHOTOS = 25;

const MAX_VALUE_COMMENT_ID = COUNT_PHOTOS * MAX_COMMENTS;

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createUniqueIdFromRangeGenerator = (min, max) => {
  const ids = [];

  return function () {
    let currentId = getRandomInteger(min, max);
    while (ids.includes(currentId)) {
      currentId = getRandomInteger(min, max);
    }

    ids.push(currentId);

    return currentId;
  };
};

const getRandomArrayElement = (array) => array[getRandomInteger(0, array.length - 1)];

const generateCommentId = createUniqueIdFromRangeGenerator(1, MAX_VALUE_COMMENT_ID);

const createrComment = () => {

  const currentCommentId = generateCommentId();

  return {
    id: currentCommentId,
    avatar: `img/avatar-${getRandomInteger(1, 6)}.svg`,
    message: getRandomArrayElement(MESSAGES),
    name: getRandomArrayElement(NAMES),
  };

};

let photoId = 0;

const createFotoDescription = () => {

  ++photoId;

  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: `Фотография, опубликованная под id ${photoId}`,
    likes: getRandomInteger(MIN_LIKES, MAX_LIKES),
    comments: Array.from({ length: getRandomInteger(MIN_COMMENTS, MAX_COMMENTS) }, createrComment)
  };
};

const similarDates = Array.from({ length: COUNT_PHOTOS }, createFotoDescription);

window.console.table(similarDates);
