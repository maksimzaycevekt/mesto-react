class Api {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  // Проверка ответа от сервера
  _checkReply(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  // Общий промис для отрисовки страницы (отрендерит данные только когда оба метода на входе отработают)
  getPromiseAll() {
    return Promise.all([this.getCards(), this.getInfoUser()]);
  }

  //запрос карточек с сервера
  getCards() {
    return fetch(`${this._url}/cards`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkReply);
  }

  //загрузка информации о пользователе с сервера
  getInfoUser() {
    return fetch(`${this._url}/users/me`, {
      method: "GET",
      headers: this._headers,
    }).then(this._checkReply);
  }

  //Отправляет отредактированные данные профиля на сервер
  setUserInfo({ name, about }) {
    return fetch(`${this._url}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    }).then(this._checkReply);
  }

  //добавить новую карточку на сервер
  postCard({ cardName, cardLink }) {
    return fetch(`${this._url}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name: cardName,
        link: cardLink,
      }),
    }).then(this._checkReply);
  }

  //удалить карточку с сервера
  deleteCard(cardId) {
    return fetch(`${this._url}/cards/${cardId}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._checkReply);
  }

  //проверяет статус лайка и выполняет соответстующий запрос
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "PUT",
        headers: this._headers,
      }).then(this._checkReply);
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        method: "DELETE",
        headers: this._headers,
      }).then(this._checkReply);
    }
  }

  //сменить аватар
  setUserAvatar(imageUrl) {
    return fetch(`${this._url}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        avatar: imageUrl, // тут должен быть url нового аватара
      }),
    }).then(this._checkReply);
  }
}

const api = new Api({
  url: "https://mesto.nomoreparties.co/v1/cohort-58",
  headers: {
    authorization: "8296479c-2639-4ad9-a3e8-cb15f60bfcf0",
    "Content-Type": "application/json",
  },
});

export default api;
