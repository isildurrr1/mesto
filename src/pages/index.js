import './index.css';
import {btnProfileEdit, btnCardAdd, initialCards, settings} from '../script/utils/data.js';
import Card from '../script/components/Card.js';
import FormValidator from '../script/components/FormValidator.js';
import Section from '../script/components/Section.js';
import PopupWithImage from '../script/components/PopupWithImage.js';
import PopupWithForm from '../script/components/PopupWithForm.js';
import UserInfo from '../script/components/UserInfo.js';

const formAddCard = new FormValidator(settings, document.querySelector('#add-card'));
formAddCard.enableValidation();

const formChangeData = new FormValidator(settings, document.querySelector('#change-data'));
formChangeData.enableValidation();

const imagePopup = new PopupWithImage('.popup_image');
imagePopup.setEventListeners();

const handleCardClick = (source, name) => {
  imagePopup.open(source, name);
}

const createCardClass = (image, text, templateSelector) => {
  const card = new Card(image, text, templateSelector, handleCardClick);
  return card.generateCard();
}

const cardList = new Section({ items: initialCards, renderer: (item) => {
    const cardElement = createCardClass(item.link, item.name, '#card');
    cardList.addItem(cardElement);
  }
}, '.elements');

cardList.renderItems();

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

const editPopup = new PopupWithForm('.popup_edit-profile', (evt) => {
  evt.preventDefault();
  const editValues = editPopup.getInputValues();
  userInfo.setUserInfo(editValues.name, editValues.job);
  editPopup.close();
})

editPopup.setEventListeners();

const newCardPopup = new PopupWithForm('.popup_add-card', (evt) => {
  evt.preventDefault();
  const cardValues = newCardPopup.getInputValues();
  const newCard = createCardClass(cardValues.src, cardValues.place, '#card');
  cardList.addItem(newCard);
  newCardPopup.close();
});

newCardPopup.setEventListeners();

btnProfileEdit.addEventListener('click', () => {
  editPopup.open();
  editPopup.setInputValues(userInfo.getUserInfo());
});

btnCardAdd.addEventListener('click', () => {
  formAddCard.toggleButtonState();
  newCardPopup.open();
});

