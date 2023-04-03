export default class Card {
  constructor(image, text, templateSelector, handleCardClick) {
    this._image = image;
    this._text = text;
    this._templateSelector = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like');
    this._trash = this._element.querySelector('.element__trash');
    this._imageElement = this._element.querySelector('.element__image')
    this._nameElement = this._element.querySelector('.element__name');
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._handleLikeClick();
    });
    this._trash.addEventListener('click', () => {
      this._handleDeleteClick();
    });
    this._imageElement.addEventListener('click', () => {
      this._handleOpenImage();
    });
  }

  _handleLikeClick() {
    this._like.classList.toggle('element__like_active');
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleOpenImage() {
    this._handleCardClick(this._image, this._text);
  }

  generateCard() {
    this._setEventListeners();
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
    this._nameElement.textContent = this._text;
    return this._element;
  }
}
