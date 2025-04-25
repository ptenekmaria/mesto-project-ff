//Функция открытия поп-ап
const openPopup = (popup) => {
    popup.classList.add('popup_is-animated');
    popup.classList.add('popup_is-opened');

    document.addEventListener('keydown', closePopupIfEscClicked);
};
  
//Функция закрытия поп-ап
const closePopup = (popup) => {
    popup.classList.remove('popup_is-opened');
    popup.classList.remove('popup_is-animated'); 

    const submitButton = popup.querySelector('.popup__button');
    submitButton.textContent = 'Сохранить'

    document.removeEventListener('keydown', closePopupIfEscClicked);
};

//Функция очистки формы после закрытия
const clearPopupForm = (popup) => {
    const popupForm = popup.querySelector('.popup__form');

    if (popupForm) {
        popupForm.reset();
    }
};

//Функция закрытия поп-ап по клику на оверлей
const closePopupIfOverlayClicked = (evt) => {
   const target = evt.target;
   const dialog = target.closest('.popup');

   if (target === dialog) {
    closePopup(dialog, closePopupIfEscClicked);
   }
};

//Функция закрытия поп-ап по кнопке Esc
const closePopupIfEscClicked = (evt) => {
   if (evt.key === 'Escape') { 
    const openedPopup = document.querySelector('.popup_is-opened');

    closePopup(openedPopup);

    document.removeEventListener('keydown', closePopupIfEscClicked);
   }
};

export { openPopup, closePopup, clearPopupForm, closePopupIfOverlayClicked, closePopupIfEscClicked };