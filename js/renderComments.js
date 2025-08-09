const bigPicture = document.querySelector('.big-picture');
const shownCommentsCount = bigPicture.querySelector('.social__comment-shown-count');
const commentsList = bigPicture.querySelector('.social__comments');
const showCommentsMoreBtn = bigPicture.querySelector('.comments-loader');

const COMMENTS_STEP = 5;
let renderedCommentsCount = 0; // вспомогательный счетчик отрисованных комментариев
let allComments = [];

const clearComments = () => {
  showCommentsMoreBtn.classList.remove('hidden');
  commentsList.innerHTML = '';
  renderedCommentsCount = 0;
};

const renderComments = (comments) => {

  if(renderedCommentsCount === 0) {
    allComments = comments;
    commentsList.innerHTML = '';
    showCommentsMoreBtn.addEventListener('click', onShowCommentsMoreBtnClick);
  }

  if(comments.length <= COMMENTS_STEP) {
    showCommentsMoreBtn.classList.add('hidden');
  }

  // новая пачка комментариев для отрисовки
  const currentCommentsBunch = comments.slice(renderedCommentsCount, renderedCommentsCount + COMMENTS_STEP);

  const htmlTpl = currentCommentsBunch.reduce((accum, comment) => `${accum}` +
      `<li class="social__comment">
        <img class="social__picture" src="${comment.avatar}" alt="${comment.name}" width="35" height="35">
        <p class="social__text">${comment.message}</p>
      </li>`, '');

  commentsList.insertAdjacentHTML('beforeend', htmlTpl);

  shownCommentsCount.textContent = currentCommentsBunch.length + renderedCommentsCount;

  renderedCommentsCount += COMMENTS_STEP;
};

function onShowCommentsMoreBtnClick() {

  renderComments(allComments);

  if(renderedCommentsCount >= allComments.length){
    showCommentsMoreBtn.removeEventListener('click', onShowCommentsMoreBtnClick);
    showCommentsMoreBtn.classList.add('hidden');
  }
}

export { renderComments, clearComments };
