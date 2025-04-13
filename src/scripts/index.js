import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openPopup, fillingProfileEditPopup, fillingImgPopup, closePopup, clearPopupForm, closePopupIfOverlayClicked, closePopupIfEscClicked, submitProfileEdit, submitNewCard } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imgTypePopup = document.querySelector('.popup_type_image');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));

//Вывод карточек на страницу
const cards = initialCards.map(newCard => createCard(newCard, cardTemplate, deleteCard, likeCard));
cards.forEach(item => {
    placesList.append(item);
    const img = item.querySelector('.card__image');
    img.addEventListener('click', (evt) => {
        fillingImgPopup(evt, imgTypePopup);
        openPopup(imgTypePopup);
        document.addEventListener('keydown', closePopupIfEscClicked);
    });
});

//Открытие диалога редактирования профиля
profileEditButton.addEventListener('click', () => {
    fillingProfileEditPopup(profileEditPopup);
    openPopup(profileEditPopup);
    document.addEventListener('keydown', closePopupIfEscClicked);
    });

//Открытие диалога добавления карточки
newCardButton.addEventListener('click', () => { 
    openPopup(newCardPopup);
    document.addEventListener('keydown', closePopupIfEscClicked);
});

//Закрытие поп-ап по кнопке
popupCloseButtons.forEach(item => item.addEventListener('click', (evt) => {
    const popupToClose = evt.target.closest('.popup');
    closePopup(popupToClose);
    clearPopupForm(popupToClose);
    document.removeEventListener('keydown', closePopupIfEscClicked);
}));

//Закрытие поп-ап по оверлею
popups.forEach(item => item.addEventListener('mousedown', (evt) => {
    closePopupIfOverlayClicked(evt, closePopup);
    document.removeEventListener('keydown', closePopupIfEscClicked);
}));

//Сохранение изменений в профиле
profileEditPopup.addEventListener('submit', (evt) => {
    submitProfileEdit(evt);
    closePopup(profileEditPopup);
    clearPopupForm(profileEditPopup);
}); 

//Добавление новой карточки
newCardPopup.addEventListener('submit', (evt) => {
    submitNewCard(evt, createCard, cardTemplate, placesList, deleteCard, likeCard);
    closePopup(newCardPopup);
    clearPopupForm(newCardPopup);
    const img = placesList.querySelector('.card__image');
    img.addEventListener('click', (evt) => {
        fillingImgPopup(evt, imgTypePopup);
        openPopup(imgTypePopup);
        document.addEventListener('keydown', closePopupIfEscClicked);
    });
});