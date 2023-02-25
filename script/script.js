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
const cards = document.querySelector('.elements');
const placeInput = popupAddCard.querySelector('.popup__input_form_place');
const srcInput = popupAddCard.querySelector('.popup__input_form_src');
const addNewCardForm = popupAddCard.querySelector('.popup__form');
const btnCardAddSubmit = popupAddCard.querySelector('.popup__button');
const btnCardAddClose = popupAddCard.querySelector('.popup__close');
const popupImage = document.querySelector('.popup_image');
const popupImageSrc = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__text');
const btnImageClose = popupImage.querySelector('.popup__close')


const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
}

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
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
  }
}

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

const createCard = (name, link) => {
  const card = cardTemplate.querySelector('.element').cloneNode(true);
  const cardData = card.querySelector('.element__image');
  card.querySelector('.element__name').textContent = name;
  cardData.alt = name;
  cardData.src = link;
  card.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  card.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })
  cardData.addEventListener('click', function (evt) {
    openImagePopup(name, link);
  })
  return card;
}

const addCard = (cards, card) => {
  cards.prepend(card);
}

initialCards.forEach((title) => {
  addCard(cards, createCard(title.name, title.link));
})

const addNewCard = () => {
  if (placeInput.value === '' || srcInput.value === '') {
    closePopup(popupAddCard);
  } else {
    addCard(cards, createCard(placeInput.value, srcInput.value));
    addNewCardForm.reset()
    closePopup(popupAddCard);
  }
}

const openImagePopup = (name, source) => {
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

const popups = document.querySelectorAll('.popup');

popups.forEach((overlay) => {
  overlay.addEventListener('mousedown', (evt) => {
    closePopup(evt.target);
  })
})

document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape') {
    popups.forEach((overlay) => {
        closePopup(overlay)
    })
  }
})
