const findTemplate = (id) => {
  const template = document.querySelector(`#${id}`);

  if(!template) {
    throw new Error(`Шаблон с id=${id} не найден`);
  }

  if(!(template instanceof HTMLTemplateElement)) {
    throw new Error(`Элемент с id=${id} НЕ является шаблоном!!!`);
  }

  return template.content.firstElementChild;
};

export { findTemplate };
