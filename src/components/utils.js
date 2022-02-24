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

export {openPopup, closePopup, resetForm};