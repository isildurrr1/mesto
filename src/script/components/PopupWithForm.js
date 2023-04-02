import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popupSelector.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
  }
  _getInputValues() {
    const inputsValues = {};
    this._formInputs.forEach(input => {
      inputsValues[input.name] = input.value
    });
    return inputsValues;
  }
  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    })
    this._popupSelector.addEventListener('submit', this._submit);
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) =>{
      this._handleEscClose(evt);
    });
    this._popupSelector.removeEventListener('mousedown', (evt) => {
      if(evt.target === this._popupSelector) this.close()
    })
    this._form.reset();
  }
}
