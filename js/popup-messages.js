import { isEscapeKey } from './utils.js';
import { findTemplate } from './dom.js';


const ALERT_SHOW_TIME = 5000;

const NotificationHtml = {
  'data-error': findTemplate('data-error').cloneNode(true),
  'error': findTemplate('error').cloneNode(true),
  'success': findTemplate('success').cloneNode(true),
};

let notification = null;
let closeNotificationButton = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeNotification();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target === notification) {
    removeNotification();
  }
};

const onCloseNotificationButtonClick = () => removeNotification();

const addListener = () => {
  closeNotificationButton.addEventListener('click', onCloseNotificationButtonClick);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};


const showNotification = (notificationType) => {

  notification = NotificationHtml[notificationType];

  document.body.appendChild(notification);

  switch (notificationType) {
    case 'data-error':
      setTimeout(() => {
        notification.remove();
      }, ALERT_SHOW_TIME);
      break;

    case 'error': {
      closeNotificationButton = notification.querySelector('.error__button');
      addListener();
    }
      break;
    default: {
      closeNotificationButton = notification.querySelector('.success__button');
      addListener();
    }
  }
};

function removeNotification() {
  notification.remove();
  closeNotificationButton.removeEventListener('click', onCloseNotificationButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

export { showNotification };
