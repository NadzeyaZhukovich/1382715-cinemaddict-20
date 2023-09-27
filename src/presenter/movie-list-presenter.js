import {remove, render} from '../framework/render.js';
import FooterStatisticsView from '../view/footer-statistics-view.js';
import UserView from '../view/user-view.js';
import MoviePresenter from './movie-presenter.js';
import SortView from '../view/sort-view.js';
import NavigationView from '../view/navigation-view.js';
import FilmsListView from '../view/films-list-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import FilmListEmptyView from '../view/film-list-empty-view.js';
import {generateNavigation} from '../model/navigation-model.js';
import {updateMovie} from '../utils/common.js';

const MOVIE_COUNT_PER_STEP = 5;
export default class MovieListPresenter {
  #moviesHeaderContainer = null;
  #moviesMainContainer = null;
  #moviesFooterStatisticsContainer = null;
  #moviesBodyContainer = null;

  #showMoreButtonComponnet = null;

  #movies = [];

  #navigationList = null;

  #footerStatistics = new FooterStatisticsView();
  #user = new UserView();
  // #navigation = new NavigationView({
  //   navigationList: this.#navigationList
  // });
  #sort = new SortView();
  #movieList = new FilmsListView();
  #movieListEmpty = new FilmListEmptyView();

  #moviePresenters = new Map();

  #renderMoviesCount = MOVIE_COUNT_PER_STEP;

  constructor({moviesHeaderContainer, moviesMainContainer, moviesFooterStatisticsContainer, moviewsBodyContainer, movies}) {
    this.#moviesHeaderContainer = moviesHeaderContainer;
    this.#moviesMainContainer = moviesMainContainer;
    this.#moviesFooterStatisticsContainer = moviesFooterStatisticsContainer;
    this.#moviesBodyContainer = moviewsBodyContainer;
    this.#movies = movies;
    this.#navigationList = generateNavigation(this.#movies);
  }

  init() {
    this.#renderUser();
    this.#renderNavigation();
    this.#renderSort();

    this.#renderMovieBoard(this.#movies);
    this.#renderShowMoreButton();
    render(this.#footerStatistics, this.#moviesFooterStatisticsContainer);
  }

  #renderMovieBoard(movieList) {
    if(!movieList.length) {
      this.#renderMovieListEmpty();
    } else {
      this.#renderMovieList();

      //TODO: сейчас это выглядит что всегда выводится только значение из MOVIE_COUNT_PER_STEP
      //TODO: или я не понимаю?
      for(let i = 0; i < Math.min(movieList.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#renderMovieCard(movieList[i]);
      }
    }
  }

  #renderUser() {
    render(this.#user, this.#moviesHeaderContainer);
  }

  #renderNavigation() {
    render(new NavigationView({navigationList: this.#navigationList}), this.#moviesMainContainer);
  }

  #renderSort() {
    render(this.#sort, this.#moviesMainContainer);
  }

  #renderMovieList() {
    render(this.#movieList, this.#moviesMainContainer);
  }

  #renderMovieCard(movie) {
    const moviePresenter = new MoviePresenter({
      movieContainer: this.#movieList.getFilmCardContainer(),
      moviesBodyContainer: this.#moviesBodyContainer,
      onModeChange: this.#handleModeChange,
      onMovieDataChange: this.#handelMovieChange,
    });

    moviePresenter.init(movie);
    this.#moviePresenters.set(movie.id, moviePresenter);
  }

  #renderMovieListEmpty() {
    render(this.#movieListEmpty, this.#moviesMainContainer);
  }

  #renderShowMoreButton() {
    if(this.#movies.length > MOVIE_COUNT_PER_STEP) {
      this.#showMoreButtonComponnet = new ShowMoreButtonView({
        onClick: this.#handleShowMoreButtonClick
      });
      render(this.#showMoreButtonComponnet, this.#movieList.element);
    }
  }

  #handleShowMoreButtonClick = () => {
    const moviesCount = this.#movies.length;
    const newRenderMoviesCount = Math.min(moviesCount, this.#renderMoviesCount + MOVIE_COUNT_PER_STEP);
    const movies = this.#movies.slice(this.#renderMoviesCount, newRenderMoviesCount);

    this.#renderMovieBoard(movies);
    this.#renderMoviesCount = newRenderMoviesCount;

    if(this.#renderMoviesCount >= moviesCount) {
      remove(this.#showMoreButtonComponnet);
    }
  };

  #handleModeChange = () => {
    this.#moviePresenters.forEach((presenter) => presenter.resetView());
  };

  #handelMovieChange = (updatedMovie) => {
    this.#movies = updateMovie(this.#movies, updatedMovie);
    this.#moviePresenters.get(updatedMovie.id).init(updatedMovie);
  };
}
