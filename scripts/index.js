const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки
function createCard (item, template, deleteFunc) {    
    const card = template.querySelector('.card').cloneNode(true);
    const cardTitle = card.querySelector('.card__title');
    const cardImage = card.querySelector('.card__image');
    const deleteButton = card.querySelector('.card__delete-button');

    cardTitle.textContent = item.name;
    cardImage.src = item.link;
    cardImage.alt = item.name;
    deleteButton.addEventListener('click', deleteFunc);

    return card;
}

// Функция удаления карточки
function deleteCard (evt) {
    const cardToDelete = evt.target.closest('.card');
    cardToDelete.remove();
}

// Вывод карточек на страницу
const cards = initialCards.map(newCard => createCard(newCard, cardTemplate, deleteCard));
cards.forEach(item => placesList.append(item));