import '../index.css';

import {openPopup, closePopup, resetForm, renderLoading} from "./utils.js";
import {createCard} from "./card.js";
import {enableValidation, resetValidation} from "./validate.js";
import {getCardsFromServer, getProfileInfoFromServer, loadCardToServer, loadAvatarToServer, loadProfileInfoToServer} from "./api.js";

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
const profileForm =  popupEdit.querySelector('.popup__form');
const nameInput = profileForm.querySelector('.popup__input-item_type_name');
const jobInput = profileForm.querySelector('.popup__input-item_type_profession');

export const popupAdd = document.querySelector('#popup-add');
const formAddElement =  popupAdd.querySelector('.popup__form');
export const cardNameInput = formAddElement.querySelector('.popup__input-item_type_card-name');
export const linkInput = formAddElement.querySelector('.popup__input-item_type_link');

const exitButtons = document.querySelectorAll('.popup__button-exit');

Promise.all([
  getProfileInfoFromServer(),
  getCardsFromServer(),
])
.then(([userData, cardsFromServer]) => {
  profileName.textContent = userData.name;
  profileName.dataset.id = userData._id;
  profession.textContent = userData.about;
  avatar.src = userData.avatar;

  cardsFromServer.forEach((item) => {
    const cardElement = createCard(item.link, item.name, item);
    cards.append(cardElement);
  });
})
.catch((err) => {
  console.log(err);
});    

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

//edit profile
editButton.addEventListener('click', function() {
  resetForm(popupEdit);
  resetValidation(popupEdit);
  openPopup(popupEdit);
  nameInput.value = profileName.textContent;
  jobInput.value = profession.textContent; 
});
  
function handleProfileFormSubmit (evt) {
  evt.preventDefault(); 
  renderLoading(true, evt);
  loadProfileInfoToServer(nameInput, jobInput)
  .then((result) => {
    profileName.textContent = nameInput.value;
    profession.textContent = jobInput.value; 
    closePopup(popupEdit);
  })
  .catch((err) => {
    console.log(err);
  })      
  .finally(() => {
    renderLoading(false, evt);             
  });
}
profileForm.addEventListener('submit', handleProfileFormSubmit);

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

function handleAvatarFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  loadAvatarToServer(linkInputOfAvatar)
  .then((result) => {
    avatar.src = linkInputOfAvatar.value;
    closePopup(popupAvatarEdit);
  })
  .catch((err) => {
    console.log(err);
  })   
  .finally(() => {
    renderLoading(false, evt);             
  });  
}
formAvatarEdit.addEventListener('submit', handleAvatarFormSubmit);

//add foto
addButton.addEventListener('click', function() { 
  resetForm(popupAdd);
  resetValidation(popupAdd);
  openPopup(popupAdd);
});

function handleFotoFormSubmit (evt) {
  evt.preventDefault();
  renderLoading(true, evt);

  loadCardToServer(linkInput, cardNameInput)
  .then((result) => {
    const cardElement = createCard(linkInput.value, cardNameInput.value, result);
    cards.prepend(cardElement);
    closePopup(popupAdd);
  })
  .catch((err) => {
    console.log(err);
  })      
  .finally(() => {
    renderLoading(false, evt);             
  });
}  
formAddElement.addEventListener('submit', handleFotoFormSubmit);

// валидация форм
enableValidation({
  formSelector: ".popup__form",
  inputSelector: ".popup__input-item",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input-item_type_error",
  errorClass: "popup__error_visible",
});