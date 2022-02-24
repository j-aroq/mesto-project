import {likeCard, deleteCard, openCardImage, cards, popupAdd, cardNameInput, linkInput} from "./index.js";
import {openPopup, closePopup} from "./utils.js";

const cardTemplate = document.querySelector('#card').content;

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
  
function submitFotoHandler (evt) {
  evt.preventDefault();
  const cardElement = createCard(linkInput.value, cardNameInput.value);
  cards.prepend(cardElement);
  closePopup(popupAdd);
}  

export {createCard, submitFotoHandler};