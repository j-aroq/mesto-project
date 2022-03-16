import {processStatus} from "./utils.js";

const config = {
  baseUrl: 'https://nomoreparties.co/v1/plus-cohort7',
  headers: {
    authorization: '6b21ad07-0cb9-4f08-a794-2baa8a2f7c4c',
    'Content-Type': 'application/json'
  }
}; 

export const getProfileInfoFromServer = () => {
    return fetch(`${config.baseUrl}/users/me`, {
      method: 'GET',
      headers: config.headers
    })
      .then(processStatus);
  };

export const getCardsFromServer = () => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'GET',
    headers: config.headers
  })
  .then(processStatus);
};

export const loadCardToServer = (linkInput, cardNameInput) => {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: cardNameInput.value,
      link: linkInput.value
    })  
  })
  .then(processStatus);
};

export const countCardLikes = (cardID, likeMethod) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardID}`, {
    method: likeMethod,
    headers: config.headers
  })
  .then(processStatus);
};

export const deleteCardFromServer = (cardID) => {
  return fetch(`${config.baseUrl}/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers
  })
  .then(processStatus);
};

export const loadAvatarToServer = (linkInputOfAvatar) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: linkInputOfAvatar.value,
    })
  })
  .then(processStatus);
};

export const loadProfileInfoToServer = (nameInput, jobInput) => {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: nameInput.value,
      about: jobInput.value
    })
  })
  .then(processStatus);
};