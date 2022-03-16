import '../index.css';

import {openPopup, closePopup, resetForm, renderLoading} from "./utils.js";
import {uploadCards, submitFotoHandler} from "./card.js";
import {enableValidation, resetValidation} from "./validate.js";

export const cards = document.querySelector('.elements');

const profile = document.querySelector('.profile');
export const profileName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.profile__button-add');
const avatar = profile.querySelector('.profile__avatar');
const avatarEditButton = profile.querySelector('.profile__avatar-button-edit');

const popupOverlays = document.querySelectorAll('.popup');

const popupAvatarEdit = document.querySelector('#popup-avatar-edit');
const formAvatarEdit =  popupAvatarEdit.querySelector('.popup__form');
const linkInputOfAvatar = popupAvatarEdit.querySelector('.popup__input-item_type_link');

const popupEdit = document.querySelector('#popup-edit');
const formElement =  popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-item_type_name');
const jobInput = formElement.querySelector('.popup__input-item_type_profession');

export const popupAdd = document.querySelector('#popup-add');
const formAddElement =  popupAdd.querySelector('.popup__form');
export const cardNameInput = formAddElement.querySelector('.popup__input-item_type_card-name');
export const linkInput = formAddElement.querySelector('.popup__input-item_type_link');

const popupOpenImage = document.querySelector('#popup-image');
const popupImage =  popupOpenImage.querySelector('.popup__image');
const popupImageTitle =  popupOpenImage.querySelector('.popup__image-title');

const exitButtons = document.querySelectorAll('.popup__button-exit');

// profile info
function getProfileInfoFromServer() {
  return fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
    method: 'GET',
    headers: {
      authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c'
    }
  })
    .then(res => res.json())
    .then((result) => {
      profileName.textContent = result.name;
      profileName.dataset.id = result._id;
      profession.textContent = result.about;
      avatar.src = result.avatar;
    });    
}

getProfileInfoFromServer();

// cards
function getCardsFromServer() {
  return fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
    method: 'GET',
    headers: {
      authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c'
    }
  })
    .then(res => res.json())
    .then((result) => {
      result.forEach((item) => {
        const cardElement = uploadCards(item);
        cards.append(cardElement);
      });
  });    
}

getCardsFromServer();

export function openCardImage(cardElement) {
  cardElement.querySelector('.elements__image').addEventListener('click', function () {
    openPopup(popupOpenImage);
    popupImage.src = cardElement.querySelector('.elements__image').src;
    popupImage.alt = cardElement.querySelector('.elements__image').textContent;
    popupImageTitle.textContent = cardElement.querySelector('.elements__title').textContent;
  }); 
}

export function likeCard(cardElement) {
  cardElement.querySelector('.elements__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('elements__like_active');
    const cardID = cardElement.dataset.id;
    if (evt.target.classList.contains('elements__like_active')) {
      fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${cardID}`, {
        method: 'PUT',
        headers: {
          authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
          'Content-Type': 'application/json'
        },
      })
      .then(res => res.json())
      .then((result) => {
        cardElement.querySelector('.elements__like-counter').textContent = result.likes.length;
      });      
    } else {
      fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/likes/${cardID}`, {
        method: 'DELETE',
        headers: {
          authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
          'Content-Type': 'application/json'
        },
      })            
      .then(res => res.json())
      .then((result) => {
        cardElement.querySelector('.elements__like-counter').textContent = result.likes.length;
      });      
    }
}); 
  
}
  
export function deleteCard(cardElement) {
  cardElement.querySelector('.elements__delete').addEventListener('click', function (evt) {
    fetch(`https://nomoreparties.co/v1/plus-cohort7/cards/${cardElement.dataset.id}`, {
      method: 'DELETE',
      headers: {
        authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
        'Content-Type': 'application/json'
      },
    })            
    .then(res => res.json())
    .then((result) => {
      cardElement.remove();
    });      
  });
}

// закрытие попапов
exitButtons.forEach( function (item) {
  item.addEventListener('click', function() {
    closePopup(item.closest('.popup'));
  });    
})

// закрытие попапов по клику на оверлей
popupOverlays.forEach(function(item) {
  item.addEventListener('click', function (evt) {
    if (evt.target.classList.contains('popup_opened')) {
      closePopup(evt.target);
    }
  });
});

// закрытие попапов по нажатию Esc
export function closePopupByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);          
  }  
}

//edit profile
editButton.addEventListener('click', function() {
  resetForm(popupEdit);
  resetValidation(popupEdit);
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent; 
});
  
function submitHandler (evt) {
  evt.preventDefault(); 
  renderLoading(true, evt);
  fetch('https://nomoreparties.co/v1/plus-cohort7/users/me', {
    method: 'PATCH',
    headers: {
      authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(res => res.json())
  .then((result) => {
    profileName.textContent = nameInput.value;
    profession.textContent = jobInput.value; 
  })   
  .finally(() => {
    renderLoading(false, evt);             
  });
  closePopup(popupEdit);
}
formElement.addEventListener('submit', submitHandler);

//edit avatar

avatar.addEventListener('mouseover', function (evt) {
  avatarEditButton.classList.add('profile__avatar-button-edit_visible');
});
avatarEditButton.addEventListener('mouseout', function (evt) {
  avatarEditButton.classList.remove('profile__avatar-button-edit_visible');
});

avatarEditButton.addEventListener('click', function () {
  resetForm(popupAvatarEdit);
  resetValidation(popupAvatarEdit);
  openPopup(popupAvatarEdit);
});

function submitAvatarHandler (evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  fetch('https://nomoreparties.co/v1/plus-cohort7/users/me/avatar', {
    method: 'PATCH',
    headers: {
      authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      avatar: linkInputOfAvatar.value,
    })
  })
  .then(res => res.json())
  .then((result) => {
    avatar.src = linkInputOfAvatar.value;
  })
  .finally(() => {
    renderLoading(false, evt);             
  });  
  closePopup(popupAvatarEdit);
}
formAvatarEdit.addEventListener('submit', submitAvatarHandler);

//add foto
addButton.addEventListener('click', function() { 
  resetForm(popupAdd);
  resetValidation(popupAdd);
  openPopup(popupAdd);
});

formAddElement.addEventListener('submit', submitFotoHandler);

// валидация форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-item_type_error",
  errorClass: "popup__error_visible",
});