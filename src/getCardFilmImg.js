export { getCardFilmInfoImg };

function getCardFilmInfoImg(infoFilm) {
    return `<img class="card-film__img" src="https://image.tmdb.org/t/p/w500${infoFilm.poster_path}" alt="" loading="lazy"/>` 
}