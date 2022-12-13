export { getCardFilmInfo };

function getCardFilmInfo(infoFilm, resultGenresFilm, videoFilm) {
    return `<ul class="list card-film__list">
            <li>
                <p class="card-film__name">
                    ${infoFilm.title}
                </p>
            </li>
            <li>
                <table class="card-film__table">
                    <tbody>
                        <tr>
                            <td class="card-film__table-row-title">Vote / Votes</td>
                            <td class="card-film__table-row-name">
                                <ul class="list card-film__table-title">
                                    <li class="list card-film__table-vote">${infoFilm.vote_average}</li>
                                    <li class="list card-film__table-line"> / </li>
                                    <li class="list card-film__table-votes">${infoFilm.vote_count}</li>
                                </ul>
                            </td>
                        </tr>
                        <tr>
                            <td class="card-film__table-row-title">Popularity</td>
                            <td class="card-film__table-name">${infoFilm.popularity}</td>
                        </tr>
                        <tr>
                            <td class="card-film__table-row-title">Original Title</td>
                            <td class="card-film__table-name">${infoFilm.original_title}</td>
                        </tr>
                    </tbody>
                    <tr>
                        <td class="card-film__table-row-title">Genre</td>
                        <td class="card-film__table-genre">${resultGenresFilm}</td>
                    </tr>
                </table>
            </li>
            <li>
                <p class="card-film__overview-name">About</p>
                <p class="card-film__overview">
                    ${infoFilm.overview}
                </p>
            </li>
        </ul>`
}