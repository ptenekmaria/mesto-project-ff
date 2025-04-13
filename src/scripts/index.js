import '../pages/index.css';
import { initialCards } from './cards.js';
import { createCard, deleteCard, likeCard } from '../components/card.js';
import { openPopup, closePopup, clearPopupForm, closePopupIfOverlayClicked, closePopupIfEscClicked } from '../components/modal.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imgTypePopup = document.querySelector('.popup_type_image');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileEditName = profileEditPopup.querySelector('.popup__input_type_name');
const profileEditDescription = profileEditPopup.querySelector('.popup__input_type_description');
const imgPopup = imgTypePopup.querySelector('.popup__image');
const imgPopupCaption = imgTypePopup.querySelector('.popup__caption');

//Функция предзаполнения поп-ап для редактирования профиля
function fillingProfileEditPopup (profileName, profileDescription, profileEditName, profileEditDescription) {  
    profileEditName.value = profileName.textContent;
    profileEditDescription.value = profileDescription.textContent;
}

//Функция предзаполнения поп-ап изображения
function fillingImgPopup (evt, imgPopup, imgPopupCaption) {
    const img = evt.target;
    const card = img.closest('.card');
    const imgCaption = card.querySelector('.card__title');

    imgPopup.src = img.src;
    imgPopup.alt = img.alt;
    imgPopupCaption.textContent = imgCaption.textContent;
}

// Функция открытия изображения
function imageClick (evt, imgTypePopup, imgPopup, imgPopupCaption, fillingImgPopup, openPopup, closePopupIfEscClicked) {
    fillingImgPopup(evt, imgPopup, imgPopupCaption);
    openPopup(imgTypePopup, closePopupIfEscClicked);
}

//Функция сохранения изменений в профиле
function submitProfileEdit (evt, profileName, profileDescription, profileEditName, profileEditDescription) {
    evt.preventDefault();
  
    profileName.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
}

//Функция добавления новой карточки места
function submitNewCard (evt, createCard, cardTemplate, itemForCards, deleteCard, likeCard, imageClick, imgTypePopup, imgPopup, imgPopupCaption, fillingImgPopup, openPopup, closePopupIfEscClicked) {
    evt.preventDefault();
    const newCardName = evt.target.querySelector('.popup__input_type_card-name');
    const newCardLink = evt.target.querySelector('.popup__input_type_url');
    const newCardItem = {
        name: newCardName.value, 
        link: newCardLink.value
    }
    
    const newCard = createCard(newCardItem, cardTemplate, deleteCard, likeCard, imageClick, imgTypePopup, imgPopup, imgPopupCaption, fillingImgPopup, openPopup, closePopupIfEscClicked);
    
    itemForCards.prepend(newCard);
}

//Вывод карточек на страницу
const cards = initialCards.map(newCard => createCard(newCard, cardTemplate, deleteCard, likeCard, imageClick, imgTypePopup, imgPopup, imgPopupCaption, fillingImgPopup, openPopup, closePopupIfEscClicked));
cards.forEach(item => placesList.append(item));

//Открытие диалога редактирования профиля
profileEditButton.addEventListener('click', () => {
    fillingProfileEditPopup(profileName, profileDescription, profileEditName, profileEditDescription);
    openPopup(profileEditPopup, closePopupIfEscClicked);
    });

//Открытие диалога добавления карточки
newCardButton.addEventListener('click', () => { 
    openPopup(newCardPopup, closePopupIfEscClicked);
});

//Закрытие поп-ап по кнопке
popupCloseButtons.forEach(item => item.addEventListener('click', (evt) => {
    const popupToClose = evt.target.closest('.popup');
    closePopup(popupToClose, closePopupIfEscClicked);
    clearPopupForm(popupToClose);
}));

//Закрытие поп-ап по оверлею
popups.forEach(item => item.addEventListener('mousedown', (evt) => {
    closePopupIfOverlayClicked(evt, closePopup, closePopupIfEscClicked);
}));

//Сохранение изменений в профиле
profileEditPopup.addEventListener('submit', (evt) => {
    submitProfileEdit(evt, profileName, profileDescription, profileEditName, profileEditDescription);
    closePopup(profileEditPopup, closePopupIfEscClicked);
    clearPopupForm(profileEditPopup);
}); 

//Добавление новой карточки
newCardPopup.addEventListener('submit', (evt) => {
    submitNewCard(evt, createCard, cardTemplate, placesList, deleteCard, likeCard, imageClick, imgTypePopup, imgPopup, imgPopupCaption, fillingImgPopup, openPopup, closePopupIfEscClicked);
    closePopup(newCardPopup, closePopupIfEscClicked);
    clearPopupForm(newCardPopup);
});