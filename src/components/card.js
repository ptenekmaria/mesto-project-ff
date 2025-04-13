// Функция создания карточки
function createCard (item, template, deleteFunc, likeFunc) {    
    const card = template.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');
    const likeButton = card.querySelector('.card__like-button');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    deleteButton.addEventListener('click', deleteFunc);
    likeButton.addEventListener('click', likeFunc);

    return card;
}

// Функция удаления карточки
function deleteCard (evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

//Функция установки/снятия лайка карточки
function likeCard (evt) {
    const likeButton = evt.target;
    if (likeButton.classList.contains('card__like-button_is-active')) {
        likeButton.classList.remove('card__like-button_is-active');
    } else {
        likeButton.classList.add('card__like-button_is-active');
    }
}

export { createCard, deleteCard, likeCard };