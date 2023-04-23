export default class Card {
  constructor(cardJson, templateSelector, userId, handleCardClick, deleteCardClick, likeCardClick) {
    this._json = cardJson;
    this._image = cardJson.link;
    this._text = cardJson.name;
    this._userId = userId;
    this._likesCount = cardJson.likes.length;
    this._templateSelector = document.querySelector(templateSelector);
    this._handleCardClick = handleCardClick;
    this._deleteCardClick = deleteCardClick;
    this._likeCardClick = likeCardClick;
    this._ownerId = cardJson.owner._id;
    this._cardId = cardJson._id;
    this._element = this._getTemplate();
    this._like = this._element.querySelector('.element__like');
    this._trash = this._element.querySelector('.element__trash');
    this._imageElement = this._element.querySelector('.element__image')
    this._nameElement = this._element.querySelector('.element__name');
    this._likeCountElement = this._element.querySelector('.element__like-count');
  }

  _getTemplate() {
    const cardElement = this._templateSelector.content.querySelector('.element').cloneNode(true);
    return cardElement;
  }

  _setEventListeners() {
    this._like.addEventListener('click', () => {
      this._likeCardClick(this._cardId, this._like, this);
    });
    this._trash.addEventListener('click', () => {
      this._deleteCardClick(this)
    });
    this._imageElement.addEventListener('click', () => {
      this._handleOpenImage();
    });
  }

  handleLikeClick(likesArray) {
    this._like.classList.toggle('element__like_active');
    this._likeCountElement.textContent = likesArray.likes.length;
  }

  handleDeleteClick() {
    this._element.remove();
  }

  _handleOpenImage() {
    this._handleCardClick(this._image, this._text);
  }

  generateCard() {
    this._imageElement.src = this._image;
    this._imageElement.alt = this._text;
    this._nameElement.textContent = this._text;
    this._likeCountElement.textContent = this._likesCount;
    if (this._ownerId !== this._userId) {
      this._trash.remove();
    }
    this._json.likes.forEach(e => {
      if (e._id === this._userId) {
        this._like.classList.add('element__like_active');
      } else {
        this._like.classList.remove('element__like_active');
      }
    });
    this._setEventListeners();
    return this._element;
  }
}
