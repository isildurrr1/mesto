let formElement = document.querySelector('.popup'); // выбираем форму

// узнаем начальные данные пользователя
let profile = document.querySelector('.profile');
let name = profile.querySelector('.profile__name');
let job = profile.querySelector('.profile__job');

// открыть popup
let btnEdit = profile.querySelector('.profile__edit');
let openPopup = () => {
  formElement.classList.add('popup_opened');
}
btnEdit.addEventListener('click', openPopup);

// закрыть popup
let btnClose = formElement.querySelector('.popup__close');
let closePopup = () => {
  formElement.classList.remove('popup_opened');
}
btnClose.addEventListener('click', closePopup);

// добавляем эти данные в поля ввода
let nameInput = formElement.querySelector('.popup__name');
let jobInput = formElement.querySelector('.popup__job');
if (nameInput.textContent === '') {
  nameInput.value = name.textContent;
  jobInput.value = job.textContent;
}

// считываем новые данные из полей
let btnSubmit = formElement.querySelector('.popup__submit')
btnSubmit.addEventListener('click', function() {
  name.textContent = nameInput.value;
  job.textContent = jobInput.value;
  closePopup();
});


