
import '../pages/index.css';
import {createCard} from './components/card.js';
import {openModal, closeModal} from './components/modal.js';
import {enableValidation, clearValidation} from './validation.js';
import {
  getUserInfo,
  getCards,
  editProfile,
  deleteCardApi,
  addCardApi,
  likeCardApi,
  unlikeCardApi
} from './api.js';


const placesList=document.querySelector('.places__list');
const editButton=document.querySelector('.profile__edit-button');
const addButton=document.querySelector('.profile__add-button');
const editPopup=document.querySelector('.popup_type_edit');
const newCardPopup = document.querySelector('.popup_type_new-card');
const imagePopup=document.querySelector('.popup_type_image');
const closeButtons=document.querySelectorAll('.popup__close');
const nameInput=document.querySelector('.popup__input_type_name');
const descriptionInput=document.querySelector('.popup__input_type_description');
const profileTitle=document.querySelector('.profile__title');
const profileDescription=document.querySelector('.profile__description');
const editForm=document.querySelector('[name="edit-profile"]');
const cardForm=document.querySelector('[name="new-place"]');
const cardNameInput=document.querySelector('.popup__input_type_card-name');
const linkInput=document.querySelector('.popup__input_type_url');
const popupImage=document.querySelector('.popup__image');
const popupCaption=document.querySelector('.popup__caption');
const profileImage = document.querySelector(".profile__image");

let userId;

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

function openImagePopup(data){popupImage.src=data.link;popupCaption.textContent=data.name;openModal(imagePopup);}
function addCard(data) {
  placesList.prepend(
    createCard(
      data,
      handleDeleteCard,
      handleLikeCard,
      () => openImagePopup(data),
      userId
    )
  );
}
function handleDeleteCard(cardId, cardElement) {

  deleteCardApi(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.error(err);
    });

}
function handleLikeCard(cardId, likeButton) {

  const isLiked = likeButton.classList.contains(
    'card__like-button_is-active'
  );


  const request = isLiked
    ? unlikeCardApi(cardId)
    : likeCardApi(cardId);


  request
    .then(() => {
      likeButton.classList.toggle(
        'card__like-button_is-active'
      );
    })
    .catch((err) => {
      console.error(err);
    });

}
editButton.addEventListener('click', () => {
  nameInput.value = profileTitle.textContent;
  descriptionInput.value = profileDescription.textContent;

  clearValidation(
    editForm,
    validationConfig
  );

  openModal(editPopup);
});
addButton.addEventListener('click', () => {
  clearValidation(
    cardForm,
    validationConfig
  );

  openModal(newCardPopup);
});
closeButtons.forEach(button=>button.addEventListener('click',()=>closeModal(button.closest('.popup'))));
editForm.addEventListener('submit', (event) => {
  event.preventDefault();

  editProfile({
    name: nameInput.value,
    about: descriptionInput.value
  })
    .then((data) => {
      profileTitle.textContent = data.name;
      profileDescription.textContent = data.about;

      closeModal(editPopup);
    })
    .catch((err) => {
      console.error(err);
    });
});
cardForm.addEventListener('submit', (event) => {
  event.preventDefault();

  addCardApi({
    name: cardNameInput.value,
    link: linkInput.value
  })
    .then((card) => {
      addCard(card);

      cardForm.reset();
      closeModal(newCardPopup);
    })
    .catch((err) => {
      console.error(err);
    });
});
Promise.all([
  getUserInfo(),
  getCards()
])
  .then(([userData, cards]) => {

    userId = userData._id;

    profileTitle.textContent = userData.name;
    profileDescription.textContent = userData.about;

    profileImage.style.backgroundImage =
      `url(${userData.avatar})`;

    cards.forEach(addCard);

  })
  .catch((err) => {
    console.error(err);
  });