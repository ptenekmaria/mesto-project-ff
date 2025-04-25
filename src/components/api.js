const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-36',
    headers: {
      authorization: '823932d0-1918-4cdc-8da3-4e3d27749d7c',
      jsonType: 'application/json'
    }
}

//Функция первичной обработки ответа
const handleResponse = (res) => {
    if (res.ok) {
        return res.json();
    }

    return Promise.reject(`Ошибка: ${res.status}`);
}

//Запрос данных о пользователе
export const getUserInfo = () => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "GET",
        headers: {
          authorization: config.headers.authorization
        }
      })
        .then((handleResponse));
}

//Запрос списка карточек
export const getInitialCards = () => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "GET",
        headers: {
          authorization: config.headers.authorization
        }
    })
    .then(handleResponse);
}

//Запрос на обновление данных о пользователе
export const patchUserInfo = (userInfo) => {
    return fetch(`${config.baseUrl}/users/me`, {
        method: "PATCH",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify(userInfo)
      })
        .then(handleResponse);
}

//Запрос на обновление аватара пользователя
export const patchUserAvatar = (avatarLink) => {
    return fetch(`${config.baseUrl}/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify({
            "avatar": avatarLink
        })
      })
        .then(handleResponse);
}

//Запрос на добавление новой карточки
export const postNewCard = (cardInfo) => {
    return fetch(`${config.baseUrl}/cards`, {
        method: "POST",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify(cardInfo)
    })
    .then(handleResponse);
}

//Запрос на удаление карточки
export const deleteCardOnServer = (cardId) => {
    return fetch(`${config.baseUrl}/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: config.headers.authorization
        }
    });
}

//Запрос на добавление лайка
export const addLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: config.headers.authorization
        }
    })
    .then(handleResponse);
}

//Запрос на снятие лайка
export const deleteLike = (cardId) => {
    return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: config.headers.authorization
        }
    })
    .then(handleResponse);
}