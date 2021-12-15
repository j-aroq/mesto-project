const cards = document.querySelector('.elements');
const cardTemplate = document.querySelector('#card').content;

const profile = document.querySelector('.profile');
const profileName = profile.querySelector('.profile__name');
const profession = profile.querySelector('.profile__profession');
const editButton = profile.querySelector('.profile__button-edit');
const addButton = profile.querySelector('.profile__button-add');

const popupEdit = document.querySelector('#popup-edit');
const formElement =  popupEdit.querySelector('.popup__form');
const nameInput = formElement.querySelector('.popup__input-item_type_name');
const jobInput = formElement.querySelector('.popup__input-item_type_profession');
const exitButtonEditForm = popupEdit.querySelector('.popup__button-exit');

const popupAdd = document.querySelector('#popup-add');
const formAddElement =  popupAdd.querySelector('.popup__form');
const cardNameInput = formAddElement.querySelector('.popup__input-item_type_card-name');
const linkInput = formAddElement.querySelector('.popup__input-item_type_link');
const exitButtonAddForm = popupAdd.querySelector('.popup__button-exit');

const popupOpenImage = document.querySelector('#popup-image');
const popupImage =  popupOpenImage.querySelector('.popup__image');
const popupImageTitle =  popupOpenImage.querySelector('.popup__image-title');
const exitButtonImageForm = popupOpenImage.querySelector('.popup__button-exit');


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
  return cardElement;
}
  
initialCards.forEach((item) => {
  const cardElement = createCard(item.link, item.name);
  cards.append(cardElement);

  likeCard(cardElement);
  deleteCard(cardElement);
  openCardImage(cardElement);
});

function openPopup(popup) {
  popup.classList.add('popup_opened');
}

function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

function openCardImage(cardElement) {
  cardElement.querySelector('.elements__image').addEventListener('click', function () {
    openPopup(popupOpenImage);
    popupImage.src = cardElement.querySelector('.elements__image').src;
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

exitButtonEditForm.addEventListener('click', function() { 
  closePopup(popupEdit);
});
  
function SubmitHandler (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameInput.value;
  profession.textContent = jobInput.value; 
  closePopup(popupEdit);
}
formElement.addEventListener('submit', SubmitHandler);

//add foto

addButton.addEventListener('click', function() { 
  openPopup(popupAdd);
});

exitButtonAddForm.addEventListener('click', function() { 
    closePopup(popupAdd);
    linkInput.value = "";
    cardNameInput.value = "";
});

function SubmitFotoHandler (evt) {
    evt.preventDefault();
    const cardElement = createCard(linkInput.value, cardNameInput.value);
    cards.prepend(cardElement);
    
    likeCard(cardElement);
    deleteCard(cardElement);
    openCardImage(cardElement);

    closePopup(popupAdd);
    linkInput.value = "";
    cardNameInput.value = "";
}
formAddElement.addEventListener('submit', SubmitFotoHandler);

// open foto
exitButtonImageForm.addEventListener('click', function() { 
  closePopup(popupOpenImage);
  popupImage.src = "";
  popupImageTitle.textContent = "";
});
