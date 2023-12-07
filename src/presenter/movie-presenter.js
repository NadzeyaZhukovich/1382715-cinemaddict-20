import {render, remove, replace} from '../framework/render.js';

import FilmCardView from '../view/film-card-view.js';
import FilmDetailsPopupView from '../view/film-details-popup-view.js';

const Mode = {
  DEFAULT: 'DEFAULT',
  DETAILS: 'DETAILS',
};
export default class MoviePresenter {
  #movie = null;
  #comments = null;
  #mode = Mode.DEFAULT;

  #handelModeChange = null;
  #handelMovieDataChange = null;

  #movieContainer = null;
  #moviesBodyContainer = null;

  #filmCard = null;
  #filmDetailsPopup = null;

  constructor({movieContainer, moviesBodyContainer, onModeChange, onMovieDataChange}) {
    this.#movieContainer = movieContainer;
    this.#moviesBodyContainer = moviesBodyContainer;
    this.#handelModeChange = onModeChange;
    this.#handelMovieDataChange = onMovieDataChange;
  }

  init(movie, comments) {
    this.#movie = movie;
    this.#comments = comments;

    const prevFilmCard = this.#filmCard;
    const prevFilmDetailsPopup = this.#filmDetailsPopup;

    this.#filmCard = new FilmCardView({
      movie: this.#movie,
      onMoreDetailClick: this.#handelMoreDetailClick,
      onFavoriteMovieClick: this.#handelFavoriteMovieClick,
      onWatchlistMovieClick: this.#handelWatchlistMovieClick,
      onAlreadyWatchedMovieClick: this.#handelAlreadyWatchedMovieClick,
    });

    if(prevFilmCard === null || prevFilmDetailsPopup === null) {
      render(this.#filmCard, this.#movieContainer);
      return;
    }

    // Проверка на наличие в DOM необходима,
    // чтобы не пытаться заменить то, что не было отрисовано

    if(this.#mode === Mode.DEFAULT) {
      replace(this.#filmCard, prevFilmCard);
    }

    if(this.#mode === Mode.DETAILS) {
      replace(this.FilmDetailsPopupView, prevFilmDetailsPopup);
    }

    remove(prevFilmCard);
    remove(prevFilmDetailsPopup);
  }

  destroy() {
    remove(this.#filmCard);
    remove(this.#filmDetailsPopup);
  }

  #getMovieCommnets(movie, comments) {
    let movieComments = [];
    movie.comments.forEach(movieCommentId => {
        const foundComment = comments.find(comment => comment.id == movieCommentId);
        if (foundComment) {
          movieComments.push(foundComment);
        }
    });

    return movieComments;
  }

  #openDetailsPopup() {
    this.#filmDetailsPopup = new FilmDetailsPopupView({
      movie: this.#movie,
      comments: this.#getMovieCommnets(this.#movie, this.#comments, ),
      onFormSubmit: this.#handleFormSubmit,
      onPopupClose: this.closeDetailsPopup.bind(this)
    });

    //TODO: так как элемент filmDetailsPopup должен добавляться в конец body улемента.
    //TODO: Поэтому сейчас передаю BodyContainer из main.js. Как можно сделать это лучше.
    render(this.#filmDetailsPopup, this.#moviesBodyContainer);

    this.#handelModeChange();
    this.#mode = Mode.DETAILS;
  }

  closeDetailsPopup() {
    remove(this.#filmDetailsPopup);
    this.#mode = Mode.DEFAULT;
  }

  #handelMoreDetailClick = () => {
    this.#openDetailsPopup();
  };

  #handelFavoriteMovieClick = () => {
    const movie = this.#movie;
    const userDetails = movie.userDetails;
    userDetails.favorite = !userDetails.favorite;
    this.#handelMovieDataChange({...this.#movie, userDetails});
  };

  #handelWatchlistMovieClick = () => {
    const movie = this.#movie;
    const userDetails = movie.userDetails;
    userDetails.watchlist = !userDetails.watchlist;
    this.#handelMovieDataChange({...movie, userDetails});
  };

  #handelAlreadyWatchedMovieClick = () => {
    const movie = this.#movie;
    const userDetails = movie.userDetails;
    userDetails.alreadyWatched = !userDetails.alreadyWatched;
    this.#handelMovieDataChange({...this.#movie, userDetails});
  };

  #handleFormSubmit = (update) => {
    console.log('Update in movie-presenter=> ', update)
  }

  resetView() {
    if(this.#mode !== Mode.DEFAULT) {
      this.#filmDetailsPopup.reset();
      this.closeDetailsPopup();
    }
  }
}
