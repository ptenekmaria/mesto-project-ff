import '../pages/index.css';
import { createCard, deleteCard, likeCard, updateLike } from '../components/card.js';
import { openPopup, closePopup, clearPopupForm, closePopupIfOverlayClicked, closePopupIfEscClicked } from '../components/modal.js';
import { enableValidation, clearValidation } from '../scripts/validation.js';
import { getInitialCards, getUserInfo, deleteCardOnServer, patchUserInfo, postNewCard, addLike, deleteLike, patchUserAvatar } from '../components/api.js';

const placesList = document.querySelector('.places__list');
const cardTemplate = document.querySelector('#card-template').content;
const profileEditButton = document.querySelector('.profile__edit-button');
const profileEditPopup = document.querySelector('.popup_type_edit');
const avatarEditPopup = document.querySelector('.popup_type_edit-avatar');
const newCardButton = document.querySelector('.profile__add-button');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imgTypePopup = document.querySelector('.popup_type_image');
const popups = Array.from(document.querySelectorAll('.popup'));
const popupCloseButtons = Array.from(document.querySelectorAll('.popup__close'));
const profile = document.querySelector('.profile__info');
const profileName = profile.querySelector('.profile__title');
const profileDescription = profile.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');
const profileEditName = profileEditPopup.querySelector('.popup__input_type_name');
const profileEditDescription = profileEditPopup.querySelector('.popup__input_type_description');
const imgPopup = imgTypePopup.querySelector('.popup__image');
const imgPopupCaption = imgTypePopup.querySelector('.popup__caption');
const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  };
let userId = null;

//Функция предзаполнения данных о пользователе
const fillingProfileInfo = (profileName, profileDescription, profileImage, userInfo) => {
    profileName.textContent = userInfo.name;
    profileDescription.textContent = userInfo.about;
    profileImage.style.cssText = `background-image: url(${userInfo.avatar})`;
}

//Функция предзаполнения поп-ап для редактирования профиля
const fillingProfileEditPopup = (profileName, profileDescription, profileEditName, profileEditDescription) => {  
    profileEditName.value = profileName.textContent;
    profileEditDescription.value = profileDescription.textContent;
}

// Функция открытия изображения
const openImage = (evt) => {
    const img = evt.target;
    const card = img.closest('.card');
    const imgCaption = card.querySelector('.card__title');

    imgPopup.src = img.src;
    imgPopup.alt = img.alt;
    imgPopupCaption.textContent = imgCaption.textContent;

    openPopup(imgTypePopup);
}

//Функция сохранения изменений в профиле
const submitProfileEdit = (evt, profileName, profileDescription, profileEditName, profileEditDescription) => {
    evt.preventDefault();
  
    patchUserInfo({
        name: profileEditName.value,
        about: profileEditDescription.value
    })
    .then((userInfo) => {
        profileName.textContent = userInfo.name;
        profileDescription.textContent = userInfo.about;
        closePopup(profileEditPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        const submitButton = evt.submitter;
        submitButton.textContent = 'Сохранить';
    });
}

//Функция сохранения изменений аватара
const submitAvatarEdit = (evt, avatarLink) => {
    evt.preventDefault();

    patchUserAvatar(avatarLink)
    .then((userInfo) => {
        fillingProfileInfo(profileName, profileDescription, profileImage, userInfo);
        closePopup(avatarEditPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        const submitButton = evt.submitter;
        submitButton.textContent = 'Сохранить';
    });
}

//Функция добавления новой карточки места
const submitNewCard = (evt) => {
    evt.preventDefault();
    const newCardName = evt.target.querySelector('.popup__input_type_card-name');
    const newCardLink = evt.target.querySelector('.popup__input_type_url');
    const newCardItem = {
        name: newCardName.value, 
        link: newCardLink.value
    }

    postNewCard(newCardItem)
    .then((newCardItem) => {
        const newCard = createCard(newCardItem, cardTemplate, deleteCard, likeCard, openImage, userId);
        placesList.prepend(newCard);
        closePopup(newCardPopup);
    })
    .catch((err) => {
        console.log(err);
    })
    .finally(() => {
        const submitButton = evt.submitter;
        submitButton.textContent = 'Сохранить';
    });
}

//Включение валидации всех форм
enableValidation(validationConfig);

//Получение данных о пользователе и заполнение карточками с сервера
Promise.all([getUserInfo(), getInitialCards()])
  .then(([userInfo, cardsData]) => {
    userId = userInfo._id;
    fillingProfileInfo(profileName, profileDescription, profileImage, userInfo);
    const cards = cardsData.map(newCard => createCard(newCard, cardTemplate, deleteCard, likeCard, openImage, userId));
    cards.forEach(item => placesList.append(item));
  })
  .catch((err) => {
    console.log(err);
  });

//Открытие диалога редактирования профиля
profileEditButton.addEventListener('click', () => {
    fillingProfileEditPopup(profileName, profileDescription, profileEditName, profileEditDescription);
    clearValidation(profileEditPopup, validationConfig);
    openPopup(profileEditPopup);
});

//Сохранение изменений в профиле
profileEditPopup.addEventListener('submit', (evt) => {
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    submitProfileEdit(evt, profileName, profileDescription, profileEditName, profileEditDescription);
}); 

//Открытие диалога обновления аватара
profileImage.addEventListener('click', () => {
    clearValidation(avatarEditPopup, validationConfig);
    clearPopupForm(avatarEditPopup);
    openPopup(avatarEditPopup);
});

//Сохранение изменений аватара
avatarEditPopup.addEventListener('submit', (evt) => {
    const avatarLink = evt.target.querySelector('.popup__input_type_url').value;
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    submitAvatarEdit(evt, avatarLink);
})

//Открытие диалога добавления карточки
newCardButton.addEventListener('click', () => { 
    clearValidation(newCardPopup, validationConfig);
    clearPopupForm(newCardPopup);
    openPopup(newCardPopup);
});

//Добавление новой карточки
newCardPopup.addEventListener('submit', (evt) => {
    const submitButton = evt.submitter;
    submitButton.textContent = 'Сохранение...';
    submitNewCard(evt);
});

//Закрытие поп-ап по кнопке
popupCloseButtons.forEach(item => item.addEventListener('click', (evt) => {
    const popupToClose = evt.target.closest('.popup');
    closePopup(popupToClose);
    clearPopupForm(popupToClose);
}));

//Закрытие поп-ап по оверлею
popups.forEach(item => item.addEventListener('mousedown', closePopupIfOverlayClicked));