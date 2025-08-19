const EFFECTS_SETTINGS = {
  chrome: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },
  sepia: {
    range: {
      min: 0,
      max: 1,
    },
    start: 1,
    step: 0.1
  },
  marvin: {
    range: {
      min: 0,
      max: 100,
    },
    start: 100,
    step: 1
  },
  phobos: {
    range: {
      min: 0,
      max: 3,
    },
    start: 3,
    step: 0.1
  },
  heat: {
    range: {
      min: 1,
      max: 3,
    },
    start: 3,
    step: 0.1
  }
};

const FUNCTION_FILTER_CSS = {
  'chrome': (val) => `grayscale(${val})`,
  'sepia': (val) => `sepia(${val})`,
  'marvin': (val) => `invert(${val}%)`,
  'phobos': (val) => `blur(${val}px)`,
  'heat': (val) => `brightness(${val})`
};

const effectContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = effectContainer.querySelector('.effect-level__slider');
const effectValueInput = effectContainer.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');
const previewPhoto = document.querySelector('.img-upload__preview > img');


let currentEffect = 'none';

effectContainer.classList.add('hidden');

noUiSlider.create(sliderElement, {
  range: {
    min: 0,
    max: 100,
  },
  start: 100,
  step: 1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ? value : value.toFixed(1),
    from: (value) => parseFloat(value)
  }
});

sliderElement.noUiSlider.on('update', () => {
  effectValueInput.value = sliderElement.noUiSlider.get();
  previewPhoto.style.filter = currentEffect === 'none' ? '' : FUNCTION_FILTER_CSS[currentEffect](effectValueInput.value);
});

effectsList.addEventListener('click', () => {
  currentEffect = effectsList.querySelector('input[name="effect"]:checked').value;

  if (currentEffect === 'none') {
    previewPhoto.style.filter = '';
    effectValueInput.value = null;
    effectContainer.classList.add('hidden');

  } else {
    effectContainer.classList.remove('hidden');
    sliderElement.noUiSlider.updateOptions(EFFECTS_SETTINGS[currentEffect]);
  }
});
