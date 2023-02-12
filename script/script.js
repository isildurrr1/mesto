let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let btnEdit = profile.querySelector('.profile__edit');
let btnAdd = profile.querySelector('.profile__add');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input_form_name');
let jobInput = formElement.querySelector('.popup__input_form_job');
let btnClose = document.querySelector('.popup__close');

popup.style.display = "none";
setTimeout(() => popup.style.display = "", 100);

let openPopup = () => {
  popup.classList.add('popup_opened');
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

let closePopup = () => {
  popup.classList.remove('popup_opened');
}

function handleFormSubmit (evt) {
  evt.preventDefault();
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
}

btnEdit.addEventListener('click', openPopup);
btnClose.addEventListener('click', closePopup);
formElement.addEventListener('submit', handleFormSubmit);

// добавление карточек из массива
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
const card = document.querySelector('#card').content;
// вызываем родительский элемент, куда будем копировать данные из template
const cards = document.querySelector('.elements');
const element = card.querySelector('.element').cloneNode(true);


// функция добавления карточек
const initCard = (cardElement, element, title) => {
  // копируем данные в промежуточный элемент для чтения и изменения данных
  element = card.querySelector('.element').cloneNode(true);
  element.querySelector('.element__name').textContent = title.name;
  element.querySelector('.element__image').alt = title.name;
  element.querySelector('.element__image').src = title.link;
  element.querySelector('.element__like').addEventListener('click', function (evt) {
    evt.target.classList.toggle('element__like_active');
  });
  element.querySelector('.element__trash').addEventListener('click', function (evt) {
    evt.target.parentElement.remove();
  })
  element.querySelector('.element__image').addEventListener('click', function (evt) {
    openImagePopup(evt.target.src, evt.target.parentElement.querySelector('.element__name').textContent);
  })
  cardElement.prepend(element);
}

// вызываем функцию отрисовки
initialCards.forEach((title) => {
  initCard(cards, element, title);
})

// открытие и закрытие popupAdd
const addTemplatePopup = document.querySelector('#add-card').content;
const addPopup = document.querySelector('.page');
const addElement = addTemplatePopup.querySelector('.popup').cloneNode(true);
const btnCloseAdd = addElement.querySelector('.popup__close')
const placeInput = addElement.querySelector('.popup__input_form_place');
const srcInput = addElement.querySelector('.popup__input_form_src');
const btnAddSubmit = addElement.querySelector('.popup__submit');
addPopup.append(addElement)

const openAddPopup = () => {
  addElement.classList.add('popup_opened')
}

const closeAddPopup = () => {
  addElement.classList.remove('popup_opened')
}

const addNewCard = (evt) => {
  if (placeInput.value === '' || srcInput.value === '') {
    closeAddPopup();
  } else {
    evt.preventDefault();
    initialCards.unshift({
      name: placeInput.value,
      link: srcInput.value
    })
    initCard(cards, element, initialCards[0]);
    placeInput.value = '';
    srcInput.value = '';
    closeAddPopup();
  }
}

btnAdd.addEventListener('click', openAddPopup);
btnCloseAdd.addEventListener('click', closeAddPopup);
btnAddSubmit.addEventListener('click', addNewCard);


const imageTemplatePopup = document.querySelector('#image').content;
const imageEllement = imageTemplatePopup.querySelector('.image').cloneNode(true);
addPopup.append(imageEllement)
const openImagePopup = (source, name) => {
  imageEllement.querySelector('.image__photo').src = source;
  imageEllement.querySelector('.image__text').textContent = name;
  imageEllement.classList.add('image_opened')

}

const closeImagePopup = () => {
  imageEllement.classList.remove('image_opened')
}

const btnImageClose = imageEllement.querySelector('.popup__close')
btnImageClose.addEventListener('click', closeImagePopup)


