import {comments} from '../mock/comments.js';
import {movies} from '../mock/movies.js';
import Observable from '../framework/observable';

export default class MoviesModel extends Observable {
  #comments = null;
  #movies = null;

  constructor() {
    super();
    this.#comments = comments;
    this.#movies = movies;
  }

  get comments() {
    return this.#comments;
  }

  get movies() {
    return this.#movies
      .map((movie) => this.#adaptToClient(movie));
  }

  #adaptToClient(movie) {
    // Convert to mappers
    const adaptUserDetails = (userDetails) => {
      const adaptedUserDetails = {...userDetails,
        alreadyWatched: userDetails['already_watched'],
        watchingDate: userDetails['watching_date'] !== null ? new Date(userDetails['watching_date']) : userDetails['watching_date'],
      };

      delete adaptedUserDetails['already_watched'];
      delete adaptedUserDetails['watching_date'];

      return adaptedUserDetails;
    };

    const adaptFilmInfoRelease = (filmInfoRelease) => {
      const adaptedFilmInfoRelease = {...filmInfoRelease,
        releaseDate: filmInfoRelease['date'] !== null ? new Date(filmInfoRelease['date']) : filmInfoRelease['date'],
        releaseCountry: filmInfoRelease['release_country']
      };

      delete adaptedFilmInfoRelease['date'];
      delete adaptedFilmInfoRelease['release_country'];

      return adaptedFilmInfoRelease;
    };

    const adaptFilmInfo = (filmInfo) => {
      const adaptedFilmInfo = {...filmInfo,
        alternativeTitle: filmInfo['alternative_title'],
        totalRating: filmInfo['total_rating'],
        ageRating: filmInfo['age_rating'],
        releaseData: adaptFilmInfoRelease(filmInfo['release'])
      };

      delete adaptedFilmInfo['alternative_title'];
      delete adaptedFilmInfo['total_rating'];
      delete adaptedFilmInfo['age_rating'];
      delete adaptedFilmInfo['release'];

      return adaptedFilmInfo;
    };

    const adaptedMovie = {...movie,
      filmInfo: adaptFilmInfo(movie['film_info']),
      userDetails: adaptUserDetails(movie['user_details'])
    };

    delete adaptedMovie['film_info'];
    delete adaptedMovie['user_details'];

    return adaptedMovie;
  }
}
