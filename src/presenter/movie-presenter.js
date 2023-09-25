import {render, remove} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};
export default class MoviePresenter {
  #movie = null;
  #mode = Mode.DEFAULT;

  #handelModeChange = null;

  #movieContainer = null;
  #moviesBodyContainer = null;

  #filmCard = null;
  #filmDetailsPopup = null;

  constructor({movieContainer, moviesBodyContainer, onModeChange}) {
    this.#movieContainer = movieContainer;
    this.#moviesBodyContainer = moviesBodyContainer;
    this.#handelModeChange = onModeChange;
  }

  init(movie) {
    this.#movie = movie;

    this.#filmCard = new FilmCardView({
      movie: this.#movie,
      onMoreDetailClick: this.#handelMoreDetailClick,
    });

    this.#filmDetailsPopup = new FilmDetailsPopupView({
      movie: this.#movie,
    });

    render(this.#filmCard, this.#movieContainer);
  }

  #openDetailsPopup() {
    //TODO: так как элемент filmDetailsPopup должен добавляться в конец body улемента.
    //TODO: Поэтому сейчас передаю BodyContainer из main.js. Как можно сделать это лучше.
    render(this.#filmDetailsPopup, this.#moviesBodyContainer);

    this.#filmDetailsPopup.getClosePopupButton().addEventListener('click', this.#closeClickHandler);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    this.#handelModeChange();
    this.#mode = Mode.DETAILS;
  }

  #closeDetailsPopup() {
    this.#filmDetailsPopup.getClosePopupButton().removeEventListener('click', this.#closeClickHandler);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
    remove(this.#filmDetailsPopup);
    this.#mode = Mode.DEFAULT;
  }

  #handelMoreDetailClick = () => {
    this.#openDetailsPopup();
  };

  #escKeyDownHandler = (evt) => {
    if(evt.key === 'Escape') {
      evt.preventDefault();
      this.#closeDetailsPopup();
    }
  };

  #closeClickHandler = (evt) => {
    if(evt.type === 'click') {
      evt.preventDefault();
      this.#closeDetailsPopup();
    }
  };

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#closeDetailsPopup();
    }
  }
}
