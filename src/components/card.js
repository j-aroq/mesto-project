import {likeCard, deleteCard, openCardImage, cards, popupAdd, cardNameInput, linkInput, profileName} from "./index.js";
import {openPopup, closePopup} from "./utils.js";

const cardTemplate = document.querySelector('#card').content;

function uploadCards(card) {
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
  
function createCard(link, name, cardID) {
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

function submitFotoHandler (evt) {
  evt.preventDefault();

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
  })
  .then(res => res.json())
  .then((result) => {
    const cardElement = createCard(linkInput.value, cardNameInput.value, result._id);
    cards.prepend(cardElement);
  });   

  closePopup(popupAdd);
}  

export {uploadCards, submitFotoHandler};