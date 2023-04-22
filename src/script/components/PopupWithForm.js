import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, submit) {
    super(popupSelector);
    this._submit = submit;
    this._form = this._popup.querySelector('.popup__form');
    this._formInputs = this._form.querySelectorAll('.popup__input');
    this.submitBtn = this._form.querySelector('.popup__button')
  }
  open(card) {
    super.open();
    this._card = card;
  }
  getInputValues() {
    this._inputsValues = {};
    this._formInputs.forEach(input => {
      this._inputsValues[input.name] = input.value
    });
    return this._inputsValues;
  }
  setInputValues(data) {
    this._formInputs.forEach(input => {
      input.value = data[input.name];
    });
  }
  setEventListeners() {
    super.setEventListeners();
    this._popup.addEventListener('submit', this._submit);
  }
  close() {
    super.close();
    if (this._inputsValues !== undefined) {
      this._form.reset();
    }
  }
  getCard() {
    return this._card;
  }
}
