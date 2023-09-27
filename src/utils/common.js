function updateMovie(items, update) {
  return items.map((item) => item.id === update.id ? update : item);
}

export {updateMovie};
