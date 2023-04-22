import './index.css';
import {
  btnProfileEdit,
  btnCardAdd,
  settings,
  profileAvatar,
  profileName,
  profileAbout,
  profileAvatarEdit
} from '../script/utils/data.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import UserInfo from '../script/components/UserInfo.js';
import Api from '../script/components/Api';

// Функция для усовершенствования UX
const loading = (bul, button) => {
  if (bul) {
    button.textContent = 'Сохранение...';
  } else {
    button.textContent = 'Сохранить';
  }
}

// Функция в колбэк для открытия попапа изображения карточки
const handleCardClick = (source, name) => {
  imagePopup.open(source, name);
}

// Функция вызова попапа при клике на иконку мусорного ведра
const deleteCardClick = (card) => {
  imageDeletePopup.open(card);
}

// Функция лайка/дизлайка
const likeCardClick = (cardId, status) => {
  if (status === 'like') {
    return api.likeCard(cardId);
  } else if (status === 'del') {
    return api.deleteLikeCard(cardId)
  }
}

// Функция создания объекта класса карточки
const createCardClass = (item, templateSelector) => {
  const card = new Card(item, templateSelector, handleCardClick, deleteCardClick, likeCardClick);
  return card.generateCard();
}

// Функция отрисовки карточек
const renderServerCards = () => {
  api.getInitialCards()
  .then((result) => {
    const cardList = new Section({ items: result, renderer: (item) => {
      const cardElement = createCardClass(item, '#card');
      cardList.addItem(cardElement);
    }
  }, '.elements');
  cardList.renderItems();
  })
  .catch((err) => {
      console.log(err);
  });
}

// Объект класса АПИ
const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-64',
  headers: {
    authorization: 'bbe8cda5-f620-40b5-b414-da957e140ed7',
    'Content-Type': 'application/json'
  }
})

// Получение данных пользователя с сервера
api.getProfileInfo()
  .then((result) => {
    profileName.textContent = result.name;
    profileAbout.textContent = result.about;
    profileAvatar.src = result.avatar;
  })
  .catch((err) => {
    console.log(err);
  });

// Отрисовка карточек с сервера
renderServerCards()

// Валидация форм
const formAddCard = new FormValidator(settings, document.querySelector('#add-card'));
const formChangeData = new FormValidator(settings, document.querySelector('#change-data'));
const formChangeAvatar = new FormValidator(settings, document.querySelector('#change-avatar'));
formAddCard.enableValidation();
formChangeData.enableValidation();
formChangeAvatar.enableValidation();

// Попап удаления карточки
const imageDeletePopup = new PopupWithForm('.popup_delete-image', (evt) => {
  evt.preventDefault();
  const delCard = imageDeletePopup.getCard();
  delCard.handleDeleteClick();
  api.deleteCard(delCard._cardId);
  imageDeletePopup.close();
})
imageDeletePopup.setEventListeners()

// Попап картинки
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

// Объект класса для изменения даннах пользователя на странице
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

// Попап иземения данных
const editPopup = new PopupWithForm('.popup_edit-profile', (evt) => {
  evt.preventDefault();
  const editValues = editPopup.getInputValues();
  userInfo.setUserInfo(editValues.name, editValues.job);
  loading(true, editPopup.submitBtn);
  api.editProfileInfo(editValues);
  loading(false, editPopup.submitBtn);
  editPopup.close();
})
editPopup.setEventListeners();

// Попап изменения аватара
const changeAvatarPopup = new PopupWithForm('.popup_change-avatar', (evt) => {
  evt.preventDefault();
  const image = changeAvatarPopup.getInputValues().src;
  profileAvatar.src = image;
  loading(true, changeAvatarPopup.submitBtn);
  api.changeAvatar(image);
  loading(false, changeAvatarPopup.submitBtn);
  changeAvatarPopup.close();
})
changeAvatarPopup.setEventListeners();

// Попап новой карточки
const newCardPopup = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  const cardValues = newCardPopup.getInputValues();
  loading(true, newCardPopup.submitBtn);
  api.addNewCard(cardValues)
  setTimeout(() => {
    location.reload()
  }, 400)
  loading(true, newCardPopup.submitBtn);
  newCardPopup.close();
});
newCardPopup.setEventListeners();

// Слушатели
btnProfileEdit.addEventListener('click', () => {
  editPopup.open();
  editPopup.setInputValues(userInfo.getUserInfo());
});

btnCardAdd.addEventListener('click', () => {
  formAddCard.toggleButtonState();
  newCardPopup.open();
});

profileAvatarEdit.addEventListener('click', () => {
  changeAvatarPopup.open();
})

