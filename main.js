(()=>{"use strict";function e(e,t,n,r,o){var c=t.querySelector(".card").cloneNode(!0),p=c.querySelector(".card__title"),a=c.querySelector(".card__image"),u=c.querySelector(".card__delete-button"),i=c.querySelector(".card__like-button");return p.textContent=e.name,a.src=e.link,a.alt=e.name,u.addEventListener("click",n),i.addEventListener("click",r),a.addEventListener("click",o),c}function t(e){e.target.closest(".card").remove()}function n(e){var t=e.target;t.classList.contains("card__like-button_is-active")?t.classList.remove("card__like-button_is-active"):t.classList.add("card__like-button_is-active")}function r(e){e.classList.add("popup_is-animated"),e.classList.add("popup_is-opened"),document.addEventListener("keydown",a)}function o(e){e.classList.remove("popup_is-opened"),e.classList.remove("popup_is-animated"),document.removeEventListener("keydown",a)}function c(e){var t=e.querySelector(".popup__form");t&&t.reset()}function p(e){var t=e.target,n=t.closest(".popup");t===n&&o(n)}function a(e){"Escape"===e.key&&(o(document.querySelector(".popup_is-opened")),document.removeEventListener("keydown",a))}var u=document.querySelector(".places__list"),i=document.querySelector("#card-template").content,s=document.querySelector(".profile__edit-button"),d=document.querySelector(".popup_type_edit"),l=document.querySelector(".profile__add-button"),_=document.querySelector(".popup_type_new-card"),m=document.querySelector(".popup_type_image"),y=Array.from(document.querySelectorAll(".popup")),v=Array.from(document.querySelectorAll(".popup__close")),f=document.querySelector(".profile__info"),k=f.querySelector(".profile__title"),q=f.querySelector(".profile__description"),S=d.querySelector(".popup__input_type_name"),L=d.querySelector(".popup__input_type_description"),g=m.querySelector(".popup__image"),E=m.querySelector(".popup__caption");function h(e){var t=e.target,n=t.closest(".card").querySelector(".card__title");g.src=t.src,g.alt=t.alt,E.textContent=n.textContent,r(m)}[{name:"Архыз",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg"},{name:"Челябинская область",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg"},{name:"Иваново",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg"},{name:"Камчатка",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg"},{name:"Холмогорский район",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg"},{name:"Байкал",link:"https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg"}].map((function(r){return e(r,i,t,n,h)})).forEach((function(e){return u.append(e)})),s.addEventListener("click",(function(){!function(e,t,n,r){n.value=e.textContent,r.value=t.textContent}(k,q,S,L),r(d)})),l.addEventListener("click",(function(){r(_)})),v.forEach((function(e){return e.addEventListener("click",(function(e){var t=e.target.closest(".popup");o(t),c(t)}))})),y.forEach((function(e){return e.addEventListener("mousedown",p)})),d.addEventListener("submit",(function(e){!function(e,t,n,r,o){e.preventDefault(),t.textContent=r.value,n.textContent=o.value}(e,k,q,S,L),o(d),c(d)})),_.addEventListener("submit",(function(r){!function(r){r.preventDefault();var o=r.target.querySelector(".popup__input_type_card-name"),c=r.target.querySelector(".popup__input_type_url"),p=e({name:o.value,link:c.value},i,t,n,h);u.prepend(p)}(r),o(_),c(_)}))})();