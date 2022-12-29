
let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');
let btnEdit = profile.querySelector('.profile__edit');

let popup = document.querySelector('.popup');
let formElement = popup.querySelector('.popup__form')
let nameInput = formElement.querySelector('.popup__input_form_name');
let jobInput = formElement.querySelector('.popup__input_form_job');
let btnClose = popup.querySelector('.popup__close');

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

