function openPopup(popup) {
    popup.classList.add('popup_opened');
}
  
function closePopup(popup) {
  popup.classList.remove('popup_opened');
  if (popup.querySelector('.popup__form') !== null) {
    popup.querySelector('.popup__form').reset();
    //сброс настроек валидации для корректного открытия попапа вновь
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

export {openPopup, closePopup};