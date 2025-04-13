//Функция открытия поп-ап
function openPopup (popup) {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');
}
  
//Функция предзаполнения поп-ап для редактирования профиля
function fillingProfileEditPopup (popup) {
    const profile = document.querySelector('.profile__info');
    const profileName = profile.querySelector('.profile__title');
    const profileDescription = profile.querySelector('.profile__description');
    const profileEditName = popup.querySelector('.popup__input_type_name');
    const profileEditDescription = popup.querySelector('.popup__input_type_description');
  
    profileEditName.value = profileName.textContent;
    profileEditDescription.value = profileDescription.textContent;
}

//Функция предзаполнения поп-ап изображения
function fillingImgPopup (evt, popup) {
    const img = evt.target;
    const imgSrc = img.src;
    const imgAlt = img.alt;
    const imgPopup = popup.querySelector('.popup__image');

    imgPopup.src = imgSrc;
    imgPopup.alt = imgAlt;
}
  
//Функция закрытия поп-ап
function closePopup (popup) {
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated'); 
}

//Функция очистки формы после закрытия
function clearPopupForm (popup) {
    const popupForm = popup.querySelector('.popup__form');

    if (popupForm) {
        popupForm.reset();
      }
}

//Функция закрытия поп-ап по клику на оверлей
function closePopupIfOverlayClicked (evt, closePopup) {
   const target = evt.target;
   const dialog = target.closest('.popup');
   if (target === dialog) {closePopup(dialog)};
}

//Функция закрытия поп-ап по кнопке Esc
function closePopupIfEscClicked (evt) {
   const popups = Array.from(document.querySelectorAll('.popup'));
   if (evt.key === 'Escape') { 
    popups.forEach(item => {     
        item.classList.remove('popup_is-opened');
        item.classList.remove('popup_is-animated');} );
    document.removeEventListener('keydown', closePopupIfEscClicked);
   }
}

//Функция сохранения изменений в профиле
function submitProfileEdit (evt) {
    evt.preventDefault();
    const profile = document.querySelector('.profile__info');
    const profileName = profile.querySelector('.profile__title');
    const profileDescription = profile.querySelector('.profile__description');
    const profileEditName = evt.target.querySelector('.popup__input_type_name');
    const profileEditDescription = evt.target.querySelector('.popup__input_type_description');
  
    profileName.textContent = profileEditName.value;
    profileDescription.textContent = profileEditDescription.value;
}

//Функция добавления новой карточки места
function submitNewCard (evt, createCard, cardTemplate, itemForCards, deleteCard, likeCard) {
    evt.preventDefault();
    const newCardName = evt.target.querySelector('.popup__input_type_card-name');
    const newCardLink = evt.target.querySelector('.popup__input_type_url');
    const newCardItem = {
        name: newCardName.value, 
        link: newCardLink.value
    }
    
    const newCard = createCard(newCardItem, cardTemplate, deleteCard, likeCard);
    
    itemForCards.prepend(newCard);
}

export { openPopup, fillingProfileEditPopup, fillingImgPopup, closePopup, clearPopupForm, closePopupIfOverlayClicked, closePopupIfEscClicked, submitProfileEdit, submitNewCard };