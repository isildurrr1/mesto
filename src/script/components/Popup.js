export default class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }
  open() {
    this._popupSelector.classList.add('popup_opened');
    document.addEventListener('keydown', (evt) =>{
      this._handleEscClose(evt);
    });
    this._popupSelector.addEventListener('mousedown', (evt) => {
      if(evt.target === this._popupSelector) this.close()
    })
  }
  close() {
    this._popupSelector.classList.remove('popup_opened');
    document.removeEventListener('keydown', (evt) =>{
      this._handleEscClose(evt);
    });
    this._popupSelector.removeEventListener('mousedown', (evt) => {
      if(evt.target === this._popupSelector) this.close()
    })
  }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') this.close();
  }
  setEventListeners() {
    this._popupSelector.querySelector('.popup__close').addEventListener('click', () => {
      this.close();
    })
  }
}
