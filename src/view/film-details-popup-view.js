import he from 'he';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import {humanizeDateDayMonthYear, humanizeDateHoursMin, humanizeDateDayMonthYearTime} from '../utils/data.js';
import {EmojiType} from '../utils/const.js';

const BLANK_COMMENT = {
  comment: null,
  emotion: null,
};

function creatMovieGenreList(genres) {
  return genres.map((genre) => `<span class="film-details__genre">${genre}</span>`).join('');
}

function creatCommentsContainer(comments, newComment) {
  const commentForm = creatCommentForm(newComment.emotion, newComment.comment);
  const commentList = creatCommentList(comments);
  
  return `
    <section class="film-details__comments-wrap">
      <h3 class="film-details__comments-title">Comments 
        <span class="film-details__comments-count">${comments.length}</span>
      </h3>
      ${commentList}
      ${commentForm}
    </section>
  `
}

function creatCommentList(comments) {
  if(!comments) {
    return '';
  }

  const commetsList = comments.map((comment) => creatComment(comment));

  return `
    <ul class="film-details__comments-list">
      ${commetsList}
    </ul>
  `
}

function creatComment(comment) {
  return `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
      </span>
      <div>
        <p class="film-details__comment-text">${comment.comment}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${humanizeDateDayMonthYearTime(comment.date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>
  `
}

function creatEmojiList(emojis, selectedEmotion) {
  return emojis.map((emojiType) => `
    <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emojiType}" value="${emojiType}" ${emojiType === selectedEmotion ? "checked" : ""}>
      <label class="film-details__emoji-label" for="emoji-${emojiType}">
        <img src="./images/emoji/${emojiType}.png" width="30" height="30" alt="emoji">
    </label>`)
    .join('');
}

function creatCommentForm(selectedEmotion, comment) {
  const emojiList = creatEmojiList(EmojiType, selectedEmotion);

  return `
    <form class="film-details__new-comment" action="" method="get">
      <div class="film-details__add-emoji-label">
        ${selectedEmotion ? `<img src="images/emoji/${selectedEmotion}.png" width="55" height="55" alt="emoji-smile">` : ''} 
      </div>

      <label class="film-details__comment-label">
        <textarea class="film-details__comment-input" 
          placeholder="Select reaction below and write comment here" 
          name="comment">${comment ? he.encode(comment) : ''}</textarea>
      </label>

      <div class="film-details__emoji-list">
        ${emojiList}
      </div>
    </form>
  `
}

function creatFilmDetailsPopup(movieDetail, comments, newCommentState) {
  const {filmInfo, userDetails} = movieDetail;
  const genreList = creatMovieGenreList(filmInfo.genre);
  const commentsContainer = creatCommentsContainer(comments, newCommentState);
  const movieWatchlistClassName = userDetails.watchlist
    ? 'film-details__control-button--active'
    : '';
  const movieWatchedClassName = userDetails.alreadyWatched
    ? 'film-details__control-button--active'
    : '';
  const movieFavoriteClassName = userDetails.favorite
    ? 'film-details__control-button--active'
    : '';
  return `
    <section class="film-details">
      <div class="film-details__inner">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./${filmInfo.poster}" alt="${filmInfo.alternativeTitle}">
    
              <p class="film-details__age">${filmInfo.ageRating}+</p>
            </div>
    
            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
                </div>
    
                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                </div>
              </div>
    
              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmInfo.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmInfo.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeDateDayMonthYear(filmInfo.releaseData.releaseDate)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Duration</td>
                  <td class="film-details__cell">${humanizeDateHoursMin(filmInfo.duration)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmInfo.releaseData.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">${genreList}</td>
                </tr>
              </table>
    
              <p class="film-details__film-description">${filmInfo.description}</p>
            </div>
          </div>
    
          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${movieWatchlistClassName}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${movieWatchedClassName}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${movieFavoriteClassName}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>
    
        <div class="film-details__bottom-container">
          ${commentsContainer}
        </div>
      </div>
    </section>
  `;
}
export default class FilmDetailsPopupView extends AbstractStatefulView {
  #movie = null;
  #handleFormSubmit = null;
  #handlePopupClose = null;
  #comments = null;

  constructor({movie, comments, onFormSubmit, onPopupClose}) {
    super();
    this.#movie = movie;
    this.#comments = comments;
    this._setState(FilmDetailsPopupView.parseCommentToState(BLANK_COMMENT));
    this.#handleFormSubmit = onFormSubmit;
    this.#handlePopupClose = onPopupClose;
    this._restoreHandlers()
  }

  _restoreHandlers() {
    this.element.querySelector('form')
      .addEventListener('keydown', this.#ctrlCommandEnterKeyDownHandler);

    this.element.querySelectorAll('[name="comment-emoji"]')
      .forEach(element => {
          element.addEventListener('change', (event) => {
          event.preventDefault();
          this.updateEmotion(element.value);
        });
      });

    this.element.querySelector('.film-details__comment-input')
      .addEventListener('input', this.#commentInputHandler);

    this.element.querySelector('.film-details__close-btn')
      .addEventListener('click', (event) => {
        this.#handlePopupClose()
      });

    document.addEventListener('keydown', (event) => {
      if(event.key === 'Escape') {
        this.#handlePopupClose();
      }
    });
  }

  get template() {
    return creatFilmDetailsPopup(this.#movie, this.#comments, this._state);
  }

  reset() {
    this.updateElement(
      FilmDetailsPopupView.parseCommentToState(BLANK_COMMENT),
    );
  }

  getClosePopupButton() {
    return this.element.querySelector('.film-details__close-btn');
  }

  updateEmotion(newEmotion) {
    this.updateElement({
      emotion: newEmotion
    });
  }

  #commentInputHandler = (evt) => {
    this._setState({
      comment: evt.target.value,
    });
  }

  #ctrlCommandEnterKeyDownHandler = (evt) => {
    if(evt.key === 'Enter') {
      this.updateElement({
        comment: evt.target.value,
      });
      this.#formSubmitHandler(evt);
    }
  }

  #formSubmitHandler = (evt) => {
    evt.preventDefault();
    this.#handleFormSubmit(FilmDetailsPopupView.parseStateToComment(this._state));
  };

  static parseCommentToState(comment) {
    return {...comment,
      isEmotionChecked: null,
      isComment: null,
    };
  }

  static parseStateToComment(state) {
    const commentData = {...state};

    if(!commentData.isEmotionChecked) {
      commentData.emotion = null;
    }

    if(!commentData.isComment) {
      commentData.comment = null;
    }

    delete commentData.isEmotionChecked;
    delete commentData.isComment;

    return commentData;
  }
}
