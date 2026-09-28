function handleEsc(event) {
  if (event.key === 'Escape') {
    const popup = document.querySelector('.popup_is-opened');

    if (popup) {
      closeModal(popup);
    }
  }
}

function handleOverlay(event) {
  if (event.target === event.currentTarget) {
    closeModal(event.currentTarget);
  }
}

export function openModal(popup) {
  popup.classList.add('popup_is-opened');

  document.addEventListener('keydown', handleEsc);
  popup.addEventListener('mousedown', handleOverlay);
}

export function closeModal(popup) {
  popup.classList.remove('popup_is-opened');

  document.removeEventListener('keydown', handleEsc);
  popup.removeEventListener('mousedown', handleOverlay);
}