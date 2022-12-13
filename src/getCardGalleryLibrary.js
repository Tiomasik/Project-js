export { getCardLibrary };

function getCardLibrary(filmAddWatch, filmGenreLibrary) {
    let totalFilm = ``
    let filmCurrent
for (let i = 0; i < filmAddWatch.length; i += 1) {
    filmCurrent = `<div data-filmid="${filmAddWatch[i].id}" class="photo-card">
    <a data-filmid="${filmAddWatch[i].id}" class="gallery__item link" href="">
        <img data-filmid="${filmAddWatch[i].id}" class="img-card" src="https://image.tmdb.org/t/p/w500${filmAddWatch[i].poster_path}" alt="" loading="lazy" />
        <div data-filmid="${filmAddWatch[i].id}" class="info-item">
            <p data-filmid="${filmAddWatch[i].id}" class="info-item__name">
                ${filmAddWatch[i].title}
            </p>
            <div data-filmid="${filmAddWatch[i].id}" class="info-item__desk info-item__desk-library">
                <p data-filmid="${filmAddWatch[i].id}" class="info-item__genres">
                    ${filmGenreLibrary[i]}
                </p>
                <p data-filmid="${filmAddWatch[i].id}" class="info-item__date">
                    ${filmAddWatch[i].release_date.split("-")[0]}
                </p>
                <p data-filmid="${filmAddWatch[i].id}" class="list card-film__table-vote">
                    ${filmAddWatch[i].vote_average}
                </p>

            </div>
        </div>
    </a>
</div>`
    
    totalFilm += filmCurrent
    }
    return totalFilm
}