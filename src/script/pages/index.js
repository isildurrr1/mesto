import '../../pages/index.css';
import {
  btnProfileEdit,
  btnCardAdd,
  popupEditProfile,
  popupAddCard,
  nameInput,
  jobInput,
  containerWithCards,
  popupImage,
  initialCards,
  settings} from '../utils/data.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';
import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

const formAddCard = new FormValidator(settings, document.querySelector('#add-card'));
formAddCard.enableValidation();
const formChangeData = new FormValidator(settings, document.querySelector('#change-data'));
formChangeData.enableValidation();

const handleCardClick = (source, name) => {
  const imagePopup = new PopupWithImage(source, name, popupImage);
  imagePopup.setEventListeners();
  imagePopup.open();
}

const createCardClass = (image, text, templateSelector) => {
  const card = new Card(image, text, templateSelector, handleCardClick);
  return card.generateCard();
}

const cardList = new Section({ items: initialCards, renderer: (item) => {
    const cardElement = createCardClass(item.link, item.name, '.element');
    cardList.addItem(cardElement);
  }
}, containerWithCards);

cardList.renderItems();

const userInfo = new UserInfo({nameSelector: '.profile__name', jobSelector: '.profile__job'});

const editPopup = new PopupWithForm(popupEditProfile, (evt) => {
  evt.preventDefault();
  userInfo.setUserInfo(
    editPopup._getInputValues().name,
    editPopup._getInputValues().job
   );
  editPopup.close();
})

editPopup.setEventListeners();

const newCardPopup = new PopupWithForm(popupAddCard, (evt) => {
  evt.preventDefault();
  const newCard = createCardClass(newCardPopup._getInputValues().src,
   newCardPopup._getInputValues().place,
    '.element');
  cardList.addItem(newCard);
  newCardPopup.close();
  formAddCard.toggleButtonState();
});

newCardPopup.setEventListeners();

btnProfileEdit.addEventListener('click', () => {
  editPopup.open();
  nameInput.value = userInfo.getUserInfo().name;
  jobInput.value = userInfo.getUserInfo().job;
});

btnCardAdd.addEventListener('click', () => {
  newCardPopup.open();
});

