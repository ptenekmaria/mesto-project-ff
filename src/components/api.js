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

//Функция шаблонного запроса с обработкой ответа
function request(endpoint, options) {
    return fetch(`${config.baseUrl}${endpoint}`, options).then(handleResponse);
  }

//Запрос данных о пользователе
export const getUserInfo = () => {
    return request(
        `/users/me`, 
        { method: "GET",
        headers: {
          authorization: config.headers.authorization
        }
    });
}

//Запрос списка карточек
export const getInitialCards = () => {
    return request(`/cards`, {
        method: "GET",
        headers: {
          authorization: config.headers.authorization
        }
    });
}

//Запрос на обновление данных о пользователе
export const patchUserInfo = (userInfo) => {
    return request(`/users/me`, {
        method: "PATCH",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify(userInfo)
    });
}

//Запрос на обновление аватара пользователя
export const patchUserAvatar = (avatarLink) => {
    return request(`/users/me/avatar`, {
        method: "PATCH",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify({
            "avatar": avatarLink
        })
    });
}

//Запрос на добавление новой карточки
export const postNewCard = (cardInfo) => {
    return request(`/cards`, {
        method: "POST",
        headers: {
          authorization: config.headers.authorization,
          'Content-Type': config.headers.jsonType
        },
        body: JSON.stringify(cardInfo)
    });
}

//Запрос на удаление карточки
export const deleteCardOnServer = (cardId) => {
    return request(`/cards/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: config.headers.authorization
        }
    });
}

//Запрос на добавление лайка
export const addLike = (cardId) => {
    return request(`/cards/likes/${cardId}`, {
        method: "PUT",
        headers: {
          authorization: config.headers.authorization
        }
    });
}

//Запрос на снятие лайка
export const deleteLike = (cardId) => {
    return request(`/cards/likes/${cardId}`, {
        method: "DELETE",
        headers: {
          authorization: config.headers.authorization
        }
    });
}