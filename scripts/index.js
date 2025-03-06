// DOM узлы
const placesList = document.querySelector('.places__list');

// @todo: Функция создания карточки
function createCard (item) {
    // Темплейт карточки
    const cardTemplate = document.querySelector('#card-template').content;
    const placeCard = cardTemplate.querySelector('.card').cloneNode(true);
    placeCard.querySelector('.card__title').textContent = item.name;
    placeCard.querySelector('.card__image').src = item.link;
    placeCard.querySelector('.card__image').alt = item.name;
    // добавим обработчик
    placeCard.querySelector('.card__delete-button').addEventListener('click', deleteCard);
    return placeCard;
}

// Функция удаления карточки
function deleteCard (evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

// @todo: Вывести карточки на страницу
const placeCards = initialCards.map(createCard);
placeCards.forEach(function(item) {
    placesList.append(item);
});