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
import {sortMovieOnDate, sortByRating} from '../utils/sort.js';
import {SortType} from '../utils/const.js';

const MOVIE_COUNT_PER_STEP = 5;
export default class MovieListPresenter {
  #moviesHeaderContainer = null;
  #moviesMainContainer = null;
  #moviesFooterStatisticsContainer = null;
  #moviesBodyContainer = null;

  #showMoreButtonComponnet = null;

  #movies = [];
  #sourcedMovies = [];

  #navigationList = null;
  #sortComponent = null;
  #footerStatistics = new FooterStatisticsView();
  #user = new UserView();
  #movieList = new FilmsListView();
  #movieListEmpty = new FilmListEmptyView();

  #moviePresenters = new Map();

  #renderMoviesCount = MOVIE_COUNT_PER_STEP;
  #currentSortType = SortType.DEFAULT;

  constructor({moviesHeaderContainer, moviesMainContainer, moviesFooterStatisticsContainer, moviewsBodyContainer, movies}) {
    this.#moviesHeaderContainer = moviesHeaderContainer;
    this.#moviesMainContainer = moviesMainContainer;
    this.#moviesFooterStatisticsContainer = moviesFooterStatisticsContainer;
    this.#moviesBodyContainer = moviewsBodyContainer;
    this.#movies = [...movies];
    this.#sourcedMovies = [...movies];
    this.#navigationList = generateNavigation(this.#movies);
  }

  init() {
    console.log('sourcedMovies =>', this.#sourcedMovies);

    this.#renderUser();
    this.#renderNavigation();
    this.#renderMovieBoard(this.#movies);
    render(this.#footerStatistics, this.#moviesFooterStatisticsContainer);
  }

  #renderMovieBoard(movieList) {
    this.#renderSort();
    this.#renderMovieListContent(movieList);
    this.#renderShowMoreButton();
  }

  #renderMovieListContent(movieList) {
    if(!movieList.length) {
      this.#renderMovieListEmpty();
    } else {
      this.#renderMovieList();

      for(let i = 0; i < Math.min(movieList.length, MOVIE_COUNT_PER_STEP); i++) {
        this.#renderMovieCard(movieList[i]);
      }
    }
  }

  #cleanMovieBoard() {
    this.#moviePresenters.forEach((presenter) => presenter.destroy());
    this.#moviePresenters.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponnet);
  }

  

  #renderUser() {
    render(this.#user, this.#moviesHeaderContainer);
  }

  #renderNavigation() {
    render(new NavigationView({navigationList: this.#navigationList}), this.#moviesMainContainer);
  }

  #renderSort() {
    this.#sortComponent = new SortView({
      onSortTypeChange: this.#handeleSortTypeChange,
      currentSortType: this.#currentSortType,
    })
    render(this.#sortComponent, this.#moviesMainContainer);
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

    this.#renderMovieListContent(movies);
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
    this.#sourcedMovies = updateMovie(this.#sourcedMovies, updatedMovie);
    this.#moviePresenters.get(updatedMovie.id).init(updatedMovie);
  };

  #sortMovies(sortType) {
    switch(sortType) {
      case SortType.DATE:
        this.#movies.sort(sortMovieOnDate);
        break;
      case SortType.RATING:
        this.#movies.sort(sortByRating);
        break;
      default:
        this.#movies = [...this.#sourcedMovies];
    }

    this.#currentSortType = sortType;
  }

  #handeleSortTypeChange = (sortType)  => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#renderMoviesCount = MOVIE_COUNT_PER_STEP;
    this.#sortMovies(sortType);
    this.#cleanMovieBoard();
    this.#renderMovieBoard(this.#movies);
  };
}
