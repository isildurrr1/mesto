import './index.css';
import {
  btnProfileEdit,
  btnCardAdd,
  settings,
  profileAvatar,
  profileAvatarEdit
} from '../script/utils/data.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import PopupDeleteCard from '../script/components/PopupDeleteCard';
import UserInfo from '../script/components/UserInfo.js';
import Api from '../script/components/Api';

const initialCards = [];
let userId = '';
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
const likeCardClick = (cardId, likeElement, card) => {
  if (likeElement.classList.contains('element__like_active')) {
    api.deleteLikeCard(cardId)
      .then((e) => {
        card.handleLikeClick(e)
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    api.likeCard(cardId)
      .then((e) => {
        card.handleLikeClick(e)
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

// Функция создания объекта класса карточки
const createCardClass = (item, templateSelector) => {
  const card = new Card(item, templateSelector, userId, handleCardClick, deleteCardClick, likeCardClick);
  return card.generateCard();
}

const cardList = new Section({ items: initialCards, renderer: (item) => {
  const cardElement = createCardClass(item, '#card');
  cardList.addItem(cardElement);
}
}, '.elements')

// Функция отрисовки карточек
const renderServerCards = () => {
  api.getInitialCards()
  .then((result) => {
    result.slice().reverse().forEach((e) => {
      initialCards.push(e);
    })
    cardList.renderItems();
  })
  .catch((err) => {
      console.log(err);
  });
}

// Объект класса для изменения даннах пользователя на странице
const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job', avatarSelector: '.profile__avatar'});

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
    userId = result._id;
    userInfo.setUserInfo(result.name, result.about, result.avatar)
    renderServerCards()
  })
  .catch((err) => {
    console.log(err);
  });

// Валидация форм
const formAddCard = new FormValidator(settings, document.querySelector('#add-card'));
const formChangeData = new FormValidator(settings, document.querySelector('#change-data'));
const formChangeAvatar = new FormValidator(settings, document.querySelector('#change-avatar'));
formAddCard.enableValidation();
formChangeData.enableValidation();
formChangeAvatar.enableValidation();

// Попап удаления карточки
const imageDeletePopup = new PopupDeleteCard('.popup_delete-image', (evt) => {
  evt.preventDefault();
  const delCard = imageDeletePopup.getCard();
  api.deleteCard(delCard._cardId)
  .then(() => {
    delCard.handleDeleteClick();
    imageDeletePopup.close();
  })
  .catch((err) => {
    console.log(err);
  });
})
imageDeletePopup.setEventListeners()

// Попап картинки
const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

// Попап иземения данных
const editPopup = new PopupWithForm('.popup_edit-profile', (data) => {
    const editValues = data;
    loading(true, editPopup.submitBtn);
    api.editProfileInfo(editValues)
    .then(() => {
      userInfo.setUserInfo(editValues.name, editValues.job, profileAvatar.src);
      editPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading(false, editPopup.submitBtn);
    })
})
editPopup.setEventListeners();

// Попап изменения аватара
const changeAvatarPopup = new PopupWithForm('.popup_change-avatar', (data) => {
  const image = data.src;
  loading(true, changeAvatarPopup.submitBtn);
  api.changeAvatar(image)
  .then(() => {
    profileAvatar.src = image;
    changeAvatarPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false, changeAvatarPopup.submitBtn);
  })
})
changeAvatarPopup.setEventListeners();

// Попап новой карточки
const newCardPopup = new PopupWithForm('.popup_add-card', (data) => {
  const cardValues = data;
  loading(true, newCardPopup.submitBtn);
  api.addNewCard(cardValues)
  .then((result) => {
    const newCard = createCardClass(result, '#card')
    cardList.addItem(newCard);
    loading(true, newCardPopup.submitBtn);
    newCardPopup.close();
  })
  .catch((err) => {
    console.log(err);
  })
  .finally(() => {
    loading(false, editPopup.submitBtn);
  })
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
  formChangeAvatar.toggleButtonState();
  changeAvatarPopup.open();
})

