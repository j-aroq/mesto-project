function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);          
  }  
}

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

function processStatus(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export {openPopup, closePopup, resetForm, renderLoading, processStatus};