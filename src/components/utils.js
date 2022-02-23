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
  if (popup.querySelector('.popup__form') !== null) {
    popup.querySelector('.popup__form').reset();  
  }
}

//сброс настроек валидации для корректного открытия попапа c формой вновь
function resetValidation(popup) {
  if (popup.querySelector('.popup__form') !== null) {
    const buttonElement = popup.querySelector('.popup__button');
    buttonElement.disabled = true;
    buttonElement.classList.add('popup__button_disabled');
    popup.querySelectorAll('.popup__input-item').forEach((inputElement) => {
      if (inputElement.classList.contains('popup__input-item_type_error')) {
        inputElement.classList.remove('popup__input-item_type_error');        
      }
    });
    popup.querySelectorAll('.popup__error').forEach((errorElement) => {
      if (errorElement.classList.contains('popup__error_visible')) {
        errorElement.classList.remove('popup__error_visible');        
        errorElement.textContent = '';
      }
    });
  }
}

export {openPopup, closePopup, resetForm, resetValidation};