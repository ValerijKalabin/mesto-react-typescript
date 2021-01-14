import IAvatar from "../interfaces/IAvatar";
import IPlace from "../interfaces/IPlace";
import IProfile from "../interfaces/IProfile";

export const AUTH_URL = 'https://auth.nomoreparties.co';
export const DATA_URL = 'https://mesto.nomoreparties.co/v1/cohort-16';

export const getResponseData = (response: Response) => {
  if (response.ok) {
    return response.json();
  }
  return Promise.reject(response);
};

export const register = (email: string, password: string) => {
  return fetch(`${AUTH_URL}/signup`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(getResponseData);
};

export const getToken = (email: string, password: string) => {
  return fetch(`${AUTH_URL}/signin`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({email, password})
  })
    .then(getResponseData);
};

export const checkToken = (token: string) => {
  return fetch(`${AUTH_URL}/users/me`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then(getResponseData);
};

export const getUser = () => {
  return fetch(`${DATA_URL}/users/me`, {
    method: 'GET',
    headers: {
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    }
  })
    .then(getResponseData);
};

export const updateProfile = ({ username, description }: IProfile) => {
  return fetch(`${DATA_URL}/users/me`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
    body: JSON.stringify({
      name: username,
      about: description
    })
  })
    .then(getResponseData);
}

export const updateAvatar = (dataAvatar: IAvatar) => {
  return fetch(`${DATA_URL}/users/me/avatar`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
    body: JSON.stringify(dataAvatar)
  })
  .then(getResponseData);
}

export const getCards = () => {
  return fetch(`${DATA_URL}/cards`, {
    method: 'GET',
    headers: {
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
  })
    .then(getResponseData);
};

export const createCard = (dataCard: IPlace) => {
  return fetch(`${DATA_URL}/cards`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
    body: JSON.stringify(dataCard)
  })
    .then(getResponseData);
}

export const deleteCard = (cardID: string) => {
  return fetch(`${DATA_URL}/cards/${cardID}`, {
    method: 'DELETE',
    headers: {
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
  })
    .then(getResponseData);
}

export const toggleLike = (cardID: string, isLiked: Boolean) => {
  return fetch(`${DATA_URL}/cards/likes/${cardID}`, {
    method: isLiked ? 'DELETE' : 'PUT',
    headers: {
      authorization: 'e006125d-46b3-4ae0-a3f9-77cc8ac310a7'
    },
  })
    .then(getResponseData);
}
