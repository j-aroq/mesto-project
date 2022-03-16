import {closePopupByEsc} from "./index.js";

function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByEsc);
}
  
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByEsc);
}

function resetForm(popup) {
  popup.querySelector('.popup__form').reset();  
}

function renderLoading(isLoading, evt) {
  if (isLoading) {
    evt.target.querySelector('.popup__button').textContent = "Сохранение...";
  } else {
    if (evt.target.closest('#popup-add')) {
      evt.target.querySelector('.popup__button').textContent = "Создать";        
    } else {
      evt.target.querySelector('.popup__button').textContent = "Сохранить";  
    }
  }
}

export {openPopup, closePopup, resetForm, renderLoading};