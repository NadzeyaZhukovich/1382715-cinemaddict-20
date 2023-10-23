import dayjs from "dayjs";

function getWeightForNullDate(dateA, dateB) {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
   return 1;
  }

  if (dateB === null) {
      return -1;
  }

  return null;
}

function sortMovieOnDate(movieA, movieB) {
  const weight = getWeightForNullDate(movieA.filmInfo.releaseData.releaseDate, movieB.filmInfo.releaseData.releaseDate);
 
  return weight ?? dayjs(movieA.filmInfo.releaseData.releaseDate).diff(dayjs(movieB.filmInfo.releaseData.releaseDate));
}

function getWeightForMovieRating(ratingA, ratingB) {
  if (ratingA > ratingB) {
    return 1;
  } 

  if (ratingA < ratingB) {
    return -1;
  }

  return 0;
}

function sortByRating(movieA, movieB) {
  return getWeightForMovieRating(movieA.filmInfo.totalRating, movieB.filmInfo.totalRating);
}

export {sortMovieOnDate, sortByRating};
