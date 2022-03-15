import {likeCard, deleteCard, openCardImage, cards, popupAdd, cardNameInput, linkInput} from "./index.js";
import {openPopup, closePopup} from "./utils.js";

const cardTemplate = document.querySelector('#card').content;

function createCard(link, name, likes, cardID) {
  const cardElement = cardTemplate.querySelector('.elements__element').cloneNode(true);
  cardElement.querySelector('.elements__image').src = link;
  cardElement.querySelector('.elements__image').alt = name;
  cardElement.querySelector('.elements__title').textContent = name;
  cardElement.querySelector('.elements__like-counter').textContent = likes.length;
  cardElement.dataset.id = cardID;
  likeCard(cardElement);
  deleteCard(cardElement);
  openCardImage(cardElement);
  return cardElement;
}
  
function submitFotoHandler (evt) {
  evt.preventDefault();
  const cardElement = createCard(linkInput.value, cardNameInput.value);
  cards.prepend(cardElement);

  fetch('https://nomoreparties.co/v1/plus-cohort7/cards', {
    method: 'POST',
    headers: {
      authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value
    })
  });

  closePopup(popupAdd);
}  

export {createCard, submitFotoHandler};