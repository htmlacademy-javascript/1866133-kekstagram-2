import { isEscapeKey } from './utils.js';
import { findTemplate } from './dom.js';


const ALERT_SHOW_TIME = 5000;

const NotificationHtml = {
  'data-error': findTemplate('data-error').cloneNode(true),
  'error': findTemplate('error').cloneNode(true),
  'success': findTemplate('success').cloneNode(true),
};

let notificationElement = null;
let closeNotificationButton = null;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    removeNotification();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target === notificationElement) {
    removeNotification();
  }
};

const onCloseNotificationButtonClick = () => removeNotification();


const showNotification = (notificationType) => {

  notificationElement = NotificationHtml[notificationType];

  document.body.appendChild(notificationElement);

  if (notificationType === 'data-error') {

    setTimeout(() => {
      notificationElement.remove();
    }, ALERT_SHOW_TIME);

  } else {
    closeNotificationButton = notificationElement.querySelector('.error__button') || notificationElement.querySelector('.success__button');

    closeNotificationButton.addEventListener('click', onCloseNotificationButtonClick);
    document.addEventListener('keydown', onDocumentKeydown);
    document.addEventListener('click', onDocumentClick);
  }
};

function removeNotification() {
  notificationElement.remove();
  closeNotificationButton.removeEventListener('click', onCloseNotificationButtonClick);
  document.removeEventListener('keydown', onDocumentKeydown);
  document.removeEventListener('click', onDocumentClick);
}

export { showNotification };
