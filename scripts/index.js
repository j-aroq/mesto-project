const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.profile__button-add');

const popupOverlay = document.querySelectorAll('.popup');
const popupEdit = document.querySelector('#popup-edit');
const formElement =  popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-item_type_name');
const jobInput = formElement.querySelector('.popup__input-item_type_profession');

const popupAdd = document.querySelector('#popup-add');
const formAddElement =  popupAdd.querySelector('.popup__form');
const cardNameInput = formAddElement.querySelector('.popup__input-item_type_card-name');
const linkInput = formAddElement.querySelector('.popup__input-item_type_link');

const popupOpenImage = document.querySelector('#popup-image');
const popupImage =  popupOpenImage.querySelector('.popup__image');
const popupImageTitle =  popupOpenImage.querySelector('.popup__image-title');

const exitButton = document.querySelectorAll('.popup__button-exit');

// подгрузим новые карточки
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
  ];

function createCard(link, name) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__image').alt = name;
  cardElement.querySelector('.elements__title').textContent = name;
  likeCard(cardElement);
  deleteCard(cardElement);
  openCardImage(cardElement);
  return cardElement;
}
  
initialCards.forEach((item) => {
  const cardElement = createCard(item.link, item.name);
  cards.append(cardElement);
});

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

// закрытие попапов по клику на оверлей
popupOverlay.forEach(function(item) {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});

// закрытие попапов по нажатию Esc
document.addEventListener('keydown', function (evt) {
  if (evt.key === 'Escape') {
    popupOverlay.forEach(function(item) {
      if (item.classList.contains('popup_opened')) {
        closePopup(item);          
      }
    });
  }
});


function openCardImage(cardElement) {
  cardElement.querySelector('.elements__image').addEventListener('click', function () {
    openPopup(popupOpenImage);
    popupImage.src = cardElement.querySelector('.elements__image').src;
    popupImage.alt = cardElement.querySelector('.elements__image').textContent;
    popupImageTitle.textContent = cardElement.querySelector('.elements__title').textContent;
  }); 
}

function likeCard(cardElement) {
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
  }); 
}

function deleteCard(cardElement) {
  cardElement.querySelector('.elements__delete').addEventListener('click', function (evt) {
    cardElement.remove();
  });
}

//edit profile
editButton.addEventListener('click', function() {
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent; 
});
  
function submitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value; 
  closePopup(popupEdit);
}
formElement.addEventListener('submit', submitHandler);

//add foto

addButton.addEventListener('click', function() { 
  openPopup(popupAdd);
});

function submitFotoHandler (evt) {
    evt.preventDefault();
    const cardElement = createCard(linkInput.value, cardNameInput.value);
    cards.prepend(cardElement);
    closePopup(popupAdd);
}
formAddElement.addEventListener('submit', submitFotoHandler);

// закрытие попапов
exitButton.forEach( function (item) {
  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'));
  });    
})

//валидация форм 
const showInputError = (param, formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(param.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(param.errorClass);
};

const hideInputError = (param, formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(param.inputErrorClass);
  errorElement.classList.remove(param.errorClass);
  errorElement.textContent = '';
};

const checkInputValidity = (param, formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(param, formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(param, formElement, inputElement);
  }
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (param, inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(param.inactiveButtonClass);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(param.inactiveButtonClass);
  }
};

const setEventListeners = (param, formElement) => {
  const inputList = Array.from(formElement.querySelectorAll(param.inputSelector));
  const buttonElement = formElement.querySelector(param.submitButtonSelector);
  toggleButtonState(param, inputList, buttonElement);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      checkInputValidity(param, formElement, inputElement);
      toggleButtonState(param, inputList, buttonElement);
    });
  });
};

const enableValidation = (param) => {
  const formList = Array.from(document.querySelectorAll(param.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', function (evt) {
      evt.preventDefault();
    });
    setEventListeners(param, formElement);     
  });
};

enableValidation({
  formSelector: '.popup__form',
  inputSelector: '.popup__input-item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input-item_type_error',
  errorClass: 'popup__error_visible'
});
