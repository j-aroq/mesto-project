import '../index.css';

import {openPopup, closePopup, resetForm, renderLoading} from "./utils.js";
import {uploadCards, createCard} from "./card.js";
import {enableValidation, resetValidation} from "./validate.js";
import {getCardsFromServer, getProfileInfoFromServer, loadCardToServer, countCardLikes, deleteCardFromServer, loadAvatarToServer, loadProfileInfoToServer} from "./api.js";

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

Promise.all([
  getProfileInfoFromServer(),
  getCardsFromServer(),
])
.then((results) => {
  profileName.textContent = results[0].name;
  profileName.dataset.id = results[0]._id;
  profession.textContent = results[0].about;
  avatar.src = results[0].avatar;

  results[1].forEach((item) => {
    const cardElement = uploadCards(item);
    cards.append(cardElement);
  });
})
.catch((err) => {
  console.log(err);
});    

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
    const likeMethod = '';
    if (evt.target.classList.contains('elements__like_active')) {
      countCardLikes(cardID, 'PUT')
      .then((result) => {
        cardElement.querySelector('.elements__like-counter').textContent = result.likes.length;
      })          
      .catch((err) => {
        console.log(err);
      });   
    } else {
      countCardLikes(cardID, 'DELETE')
      .then((result) => {
        cardElement.querySelector('.elements__like-counter').textContent = result.likes.length;
      })
      .catch((err) => {
        console.log(err);
      });             
    }
  });   
}
  
export function deleteCard(cardElement) {
  cardElement.querySelector('.elements__delete').addEventListener('click', function (evt) {
    deleteCardFromServer(cardElement.dataset.id)
    .then((result) => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
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
  loadProfileInfoToServer(nameInput, jobInput)
  .then((result) => {
    profileName.textContent = nameInput.value;
    profession.textContent = jobInput.value; 
  })
  .catch((err) => {
    console.log(err);
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
  loadAvatarToServer(linkInputOfAvatar)
  .then((result) => {
    avatar.src = linkInputOfAvatar.value;
  })
  .catch((err) => {
    console.log(err);
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

function submitFotoHandler (evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  loadCardToServer(linkInput, cardNameInput)
  .then((result) => {
    const cardElement = createCard(linkInput.value, cardNameInput.value, result._id);
    cards.prepend(cardElement);
  })
  .catch((err) => {
    console.log(err);
  })      
  .finally(() => {
    renderLoading(false, evt);             
  });

  closePopup(popupAdd);
}  
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