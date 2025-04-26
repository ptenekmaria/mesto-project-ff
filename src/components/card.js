import { deleteCardOnServer, addLike, deleteLike } from '../components/api.js';

// Функция создания карточки
const createCard = (item, template, deleteFunc, likeFunc, imageClick, userId) => {    
    const card = template.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    card.setAttribute('data-card-id', item._id);

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;

    updateLike(item, userId, likeButton);
    likeButton.addEventListener('click', (evt) => {
        likeFunc(evt, userId, updateLike);
    });

    cardImage.addEventListener('click', imageClick);

    if (userId === item.owner._id) {
        deleteButton.addEventListener('click', deleteFunc);
    } else {
        deleteButton.classList.add('hidden-button');
    }

    return card;
};

// Функция удаления карточки
const deleteCard = (evt) => {
    const cardToDelete = evt.target.closest('.card');

    deleteCardOnServer(cardToDelete.dataset.cardId)
    .then(() => {
        cardToDelete.remove();
    })
    .catch((err) => {
        console.log(err);
    });
};

//Функция установки/снятия лайка карточки
const likeCard = (evt, userId, updateLike) => {
    const likeButton = evt.target;
    const card = likeButton.closest('.card');

    if (likeButton.classList.contains('card__like-button_is-active')) {
        deleteLike(card.dataset.cardId)
        .then((updatedCard) => {
            updateLike(updatedCard, userId, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    } else {
        addLike(card.dataset.cardId)
        .then((updatedCard) => {
            updateLike(updatedCard, userId, likeButton);
        })
        .catch((err) => {
            console.log(err);
        })
    }
};

//Функция обновления состояния лайка и счетчика
const updateLike = (cardItem, userId, likeButton) => {
    const isLiked = cardItem.likes.some((likedUser) => { return likedUser._id === userId });
    const likeCounter = likeButton.closest('.card').querySelector('.card__like-counter');

    if (isLiked) {
        likeButton.classList.add('card__like-button_is-active');
    } else {
        likeButton.classList.remove('card__like-button_is-active');
    }
    likeCounter.textContent = cardItem.likes.length;
}

export { createCard, deleteCard, likeCard, updateLike };