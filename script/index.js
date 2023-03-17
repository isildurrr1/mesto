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
const addNewCardForm = popupAddCard.querySelector('.popup__form');
const btnCardAddSubmit = popupAddCard.querySelector('.popup__button');
const btnCardAddClose = popupAddCard.querySelector('.popup__close');
const popupImage = document.querySelector('.popup_image');
const popupImageSrc = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__text');
const btnImageClose = popupImage.querySelector('.popup__close');
const popups = document.querySelectorAll('.popup');

const escListener = (evt) => {
  if(evt.key === 'Escape') {
    popups.forEach((overlay) => {
      closePopup(overlay)
  })
  }
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
  if (!evt.target.querySelector('.popup__button').classList.contains('popup__button_disabled')) {
    name.textContent = nameInput.value;
    job.textContent = jobInput.value;
    closePopup(popupEditProfile);
  }
}

const submitAddForm = (evt) => {
  evt.preventDefault();
  if (!evt.target.classList.contains('popup__button_disabled')) {
    addNewCard();
    closePopup(popupAddCard);
    evt.target.classList.add('popup__button_disabled');
    evt.target.setAttribute('disable', true);
  }
}

const addCard = (cards, card) => {
  cards.prepend(card);
}

data.initialCards.forEach((title) => {
  const card = new Card(title.link, title.name, '.element');
  const cardElement = card.generateCard();
  addCard(containerWithCards, cardElement);
})

const addNewCard = () => {
  if (placeInput.value === '' || srcInput.value === '') {
    closePopup(popupAddCard);
  } else {
    const card = new Card(srcInput.value, placeInput.value, '.element');
    const cardElement = card.generateCard();
    addCard(containerWithCards, cardElement);
    addNewCardForm.reset()
    closePopup(popupAddCard);
  }
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

const formList = Array.from(document.querySelectorAll(data.settings.formSelector));
formList.forEach((formElement) => {
  new FormValidator(data.settings, formElement).enableValidation();
});
