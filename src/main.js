import MovieListPresenter from './presenter/movie-list-presenter.js';
import MoviesModel from './model/movies-model.js';

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterStatisticsElement = document.querySelector('.footer__statistics');

const moviesModel = new MoviesModel();

const movieList = new MovieListPresenter({
  moviesHeaderContainer: siteHeaderElement,
  moviesMainContainer: siteMainElement,
  moviesFooterStatisticsContainer: siteFooterStatisticsElement,
  movies: moviesModel.movies,
});

movieList.init();
