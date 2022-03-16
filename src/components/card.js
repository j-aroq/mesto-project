import {likeCard, deleteCard, openCardImage, cards, profileName} from "./index.js";

const cardTemplate = document.querySelector('#card').content;

export function uploadCards(card) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = card.link;
  cardElement.querySelector('.elements__image').alt = card.name;
  cardElement.querySelector('.elements__title').textContent = card.name;
  cardElement.querySelector('.elements__like-counter').textContent = card.likes.length;
  cardElement.dataset.id = card._id;
  if (card.owner._id === profileName.dataset.id) {
    cardElement.querySelector('.elements__delete').classList.add('elements__delete_visible');    
  }
  // закрашивать черным сердечко только у лайкнутых мною фото
  const likesArray = card.likes;
  const nameMine = likesArray.some(function (name) {
    return name.name === profileName.textContent;
  });
  if (nameMine) {
    cardElement.querySelector('.elements__like').classList.add('elements__like_active');  
  }
  //
  likeCard(cardElement);
  deleteCard(cardElement);
  openCardImage(cardElement);
  return cardElement;
}
  
export function createCard(link, name, cardID) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__image').alt = name;
  cardElement.querySelector('.elements__title').textContent = name;
  cardElement.querySelector('.elements__like-counter').textContent = 0;
  cardElement.dataset.id = cardID;
  cardElement.querySelector('.elements__delete').classList.add('elements__delete_visible');    

  likeCard(cardElement);
  deleteCard(cardElement);
  openCardImage(cardElement);
  return cardElement;
}