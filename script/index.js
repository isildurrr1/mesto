import * as data from'./data.js';
import Card from './Card.js';
import FormValidator from './FormValidator.js';

const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const btnProfileEdit = profile.querySelector('.profile__edit');
const btnCardAdd = profile.querySelector('.profile__add');
const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const formEditProfile = popupEditProfile.querySelector('.popup__form');
const nameInput = formEditProfile.querySelector('.popup__input_form_name');
const jobInput = formEditProfile.querySelector('.popup__input_form_job');
const btnProfileClose = document.querySelector('.popup__close');
const cardTemplate = document.querySelector('#card').content;
const containerWithCards = document.querySelector('.elements');
const placeInput = popupAddCard.querySelector('.popup__input_form_place');
const srcInput = popupAddCard.querySelector('.popup__input_form_src');
const formPopupCard = popupAddCard.querySelector('.popup__form');
const btnCardAddSubmit = popupAddCard.querySelector('.popup__button');
const btnCardAddClose = popupAddCard.querySelector('.popup__close');
const popupImage = document.querySelector('.popup_image');
const popupImageSrc = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__text');
const btnImageClose = popupImage.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');

const formAddCard = new FormValidator(data.settings, document.querySelector('#add-card'));
formAddCard.enableValidation();
const formChangeData = new FormValidator(data.settings, document.querySelector('#change-data'));
formChangeData.enableValidation();

const escListener = (evt) => {
  if(evt.key === 'Escape') closePopup(document.querySelector('.popup_opened'));
}

const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
  document.addEventListener('keydown', escListener);
}

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
  document.removeEventListener('keydown', escListener);
}

const submitEditProfileForm = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

const submitAddForm = (evt) => {
  evt.preventDefault();
  addNewCard();
  closePopup(popupAddCard);
  formAddCard.toggleButtonState();
}

const addCard = (cards, card) => {
  cards.prepend(card);
}

const createCardClass = (image, text, templateSelector) => {
  const card = new Card(image, text, templateSelector);
  return card.generateCard();
}

data.initialCards.forEach((title) => {
  addCard(containerWithCards, createCardClass(title.link, title.name, '.element'));
})

const addNewCard = () => {
  addCard(containerWithCards, createCardClass(srcInput.value, placeInput.value, '.element'));
  formPopupCard.reset()
  closePopup(popupAddCard);
}

export const openImagePopup = (name, source) => {
  popupImageSrc.src = source;
  popupImageSrc.alt = name;
  popupImageText.textContent = name;
  openPopup(popupImage);
}

btnProfileEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

btnProfileClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formEditProfile.addEventListener('submit', submitEditProfileForm);

btnCardAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
});

btnCardAddClose.addEventListener('click', () => {
  closePopup(popupAddCard);
});

btnCardAddSubmit.addEventListener('click', submitAddForm);

btnImageClose.addEventListener('click', () => {
  closePopup(popupImage)
})

popups.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  })
})


