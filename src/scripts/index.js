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

// Функция открытия изображения
function openImage (evt) {
    const img = evt.target;
    const card = img.closest('.card');
    const imgCaption = card.querySelector('.card__title');

    imgPopup.src = img.src;
    imgPopup.alt = img.alt;
    imgPopupCaption.textContent = imgCaption.textContent;

    openPopup(imgTypePopup);
}

//Функция сохранения изменений в профиле
function submitProfileEdit (evt, profileName, profileDescription, profileEditName, profileEditDescription) {
    evt.preventDefault();
  
    profileName.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
}

//Функция добавления новой карточки места
function submitNewCard (evt) {
    evt.preventDefault();
    const newCardName = evt.target.querySelector('.popup__input_type_card-name');
    const newCardLink = evt.target.querySelector('.popup__input_type_url');
    const newCardItem = {
        name: newCardName.value, 
        link: newCardLink.value
    }
    
    const newCard = createCard(newCardItem, cardTemplate, deleteCard, likeCard, openImage);
    
    placesList.prepend(newCard);
}

//Вывод карточек на страницу
const cards = initialCards.map(newCard => createCard(newCard, cardTemplate, deleteCard, likeCard, openImage));
cards.forEach(item => placesList.append(item));

//Открытие диалога редактирования профиля
profileEditButton.addEventListener('click', () => {
    fillingProfileEditPopup(profileName, profileDescription, profileEditName, profileEditDescription);
    openPopup(profileEditPopup);
    });

//Открытие диалога добавления карточки
newCardButton.addEventListener('click', () => { 
    openPopup(newCardPopup);
});

//Закрытие поп-ап по кнопке
popupCloseButtons.forEach(item => item.addEventListener('click', (evt) => {
    const popupToClose = evt.target.closest('.popup');
    closePopup(popupToClose);
    clearPopupForm(popupToClose);
}));

//Закрытие поп-ап по оверлею
popups.forEach(item => item.addEventListener('mousedown', closePopupIfOverlayClicked));

//Сохранение изменений в профиле
profileEditPopup.addEventListener('submit', (evt) => {
    submitProfileEdit(evt, profileName, profileDescription, profileEditName, profileEditDescription);
    closePopup(profileEditPopup, closePopupIfEscClicked);
    clearPopupForm(profileEditPopup);
}); 

//Добавление новой карточки
newCardPopup.addEventListener('submit', (evt) => {
    submitNewCard(evt);
    closePopup(newCardPopup);
    clearPopupForm(newCardPopup);
});