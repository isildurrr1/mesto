const profile = document.querySelector('.profile');
const name = profile.querySelector('.profile__name');
const job = profile.querySelector('.profile__job');
const btnProfileEdit = profile.querySelector('.profile__edit');
const btnCardAdd = profile.querySelector('.profile__add');

const popupEditProfile = document.querySelector('.popup_edit-profile');
const popupAddCard = document.querySelector('.popup_add-card');
const formElement = popupEditProfile.querySelector('.popup__form')
const nameInput = formElement.querySelector('.popup__input_form_name');
const jobInput = formElement.querySelector('.popup__input_form_job');
const btnProfileClose = document.querySelector('.popup__close');


const openPopup = (popupName) => {
  popupName.classList.add('popup_opened');
}

const closePopup = (popupName) => {
  popupName.classList.remove('popup_opened');
}

const handleFormSubmit = (evt) => {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup(popupEditProfile);
}

btnProfileEdit.addEventListener('click', () => {
  openPopup(popupEditProfile);
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
});

btnProfileClose.addEventListener('click', () => {
  closePopup(popupEditProfile);
});

formElement.addEventListener('submit', handleFormSubmit);

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

// вызываем template элемент с версткой карточки
const cardTemplate = document.querySelector('#card').content;
// вызываем родительский элемент, куда будем копировать данные из template
const cards = document.querySelector('.elements');
const card = cardTemplate.querySelector('.element').cloneNode(true);

const createCard = (card, title) => {
  card = cardTemplate.querySelector('.element').cloneNode(true);
  let cardData = card.querySelector('.element__image');
  card.querySelector('.element__name').textContent = title.name;
  cardData.alt = title.name;
  cardData.src = title.link;
  card.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  card.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })
  card.querySelector('.element__image').addEventListener('click', function (evt) {
    openImagePopup(evt.target.src, evt.target.parentElement.querySelector('.element__name').textContent);
  })
  return card;
}

const addCard = (cards, card) => {
  cards.prepend(card);
}

initialCards.forEach((title) => {
  addCard(cards, createCard(card, title));
})

const placeInput = popupAddCard.querySelector('.popup__input_form_place');
const srcInput = popupAddCard.querySelector('.popup__input_form_src');

const addNewCard = () => {
  if (placeInput.value === '' || srcInput.value === '') {
    closePopup(popupAddCard);
  } else {
    initialCards.unshift({
      name: placeInput.value,
      link: srcInput.value
    })
    addCard(cards, createCard(card, initialCards[0]));
    popupAddCard.querySelector('.popup__form').reset()
    closePopup(popupAddCard);
  }
}

const btnCardAddSubmit = popupAddCard.querySelector('.popup__submit');
const btnCardAddClose = popupAddCard.querySelector('.popup__close');

btnCardAdd.addEventListener('click', () => {
  openPopup(popupAddCard);
});

btnCardAddClose.addEventListener('click', () => {
  closePopup(popupAddCard);
});

btnCardAddSubmit.addEventListener('click', () => {
  addNewCard();
});

const popupImage = document.querySelector('.popup_image');
const popupImageSrc = popupImage.querySelector('.popup__photo');
const popupImageText = popupImage.querySelector('.popup__text');

const openImagePopup = (source, name) => {
  popupImageSrc.src = source;
  popupImageSrc.alt = name;
  popupImageText.textContent = name;

  openPopup(popupImage);
}

const btnImageClose = popupImage.querySelector('.popup__close')
btnImageClose.addEventListener('click', () => {
  closePopup(popupImage)
})
