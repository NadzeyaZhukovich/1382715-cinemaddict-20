import AbstractView from '../framework/view/abstract-view.js';
import {humanizeDateYear, humanizeDateHoursMin} from '../utils/data';

function creatFilmCard(movieDetail) {
  const {filmInfo, userDetails} = movieDetail;
  const movieWatchlistClassName = userDetails.watchlist
    ? 'film-card__controls-item--active'
    : '';
  const movieWatchedClassName = userDetails.alreadyWatched
    ? 'film-card__controls-item--active'
    : '';
  const movieFavoriteClassName = userDetails.favorite
    ? 'film-card__controls-item--active'
    : '';

  return `
    <article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizeDateYear(filmInfo.releaseData.releaseDate)}</span>
          <span class="film-card__duration">${humanizeDateHoursMin(filmInfo.duration)}</span>
          <span class="film-card__genre">${filmInfo.genre}</span>
        </p>
        <img src="./${filmInfo.poster}" alt="${filmInfo.alternativeTitle}" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">0 comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${movieWatchlistClassName}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${movieWatchedClassName}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${movieFavoriteClassName}" type="button">Mark as favorite</button>
      </div>
    </article>
  `;
}
export default class FilmCardView extends AbstractView {
  #movie = null;
  #handelMoreDetailsClick = null;
  constructor({movie, onMoreDetailClick}) {
    super();
    this.#movie = movie;
    this.#handelMoreDetailsClick = onMoreDetailClick;

    this.element.addEventListener('click', this.#moreDetailClickHendler);
  }

  get template() {
    return creatFilmCard(this.#movie);
  }

  #moreDetailClickHendler = (evt) => {
    evt.preventDefault();
    this.#handelMoreDetailsClick();
  };
}
