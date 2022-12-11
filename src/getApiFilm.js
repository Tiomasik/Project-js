
import { getCard, getMessegeError, cleartMessegeError, getCardFullInfoFilm } from "./index";
export { asyncGetFilm, getGenre, asyncGetSearchFilm, asyncGetInfoFilm };

function getGenre() {
    const url = "https://api.themoviedb.org/3/genre/movie/list";
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
    }
    const { key } = parameters;
    return fetch(`${url}?api_key=${key}`)
};

function getFilm(valueInput, counter) {
    const url = "https://api.themoviedb.org/3/trending/movie/day";
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
        nameFilm: valueInput,
    }
    const { key, nameFilm } = parameters;
    
    return fetch(`${url}?api_key=${key}&page=${counter}`)
    // return fetch(`${url}?api_key=${key}`)
};

function getRequestFilm(moviID) {
    const url = `https://api.themoviedb.org/3/movie/${moviID}`;
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
    }
    const { key } = parameters;
    
    return fetch(`${url}?api_key=${key}`)
    // return fetch(`${url}?api_key=${key}`)
};

function getFilmSearch(valueInput, counter) {
    const url = "https://api.themoviedb.org/3/search/movie";
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
        nameFilm: valueInput,
    }
    const { key, nameFilm } = parameters;

    console.log(nameFilm)
    
    return fetch(`${url}?api_key=${key}&query=${nameFilm}&page=${counter}`)
    // return fetch(`${url}?api_key=${key}`)
};

async function asyncGetFilm(valueInput, counter, resultFilm) {
    cleartMessegeError()
    try {
        const promiseDataFilm = await getFilm(valueInput, counter);
        const dataFilms = await promiseDataFilm.json();
        const promiseDataGenre = await getGenre();
        const dataGenre = await promiseDataGenre.json();

        try {
            resultFilm = dataFilms.results.map(film => {
                const nameGenre = [];
                let dataYear;

                for (const genreID of film.genre_ids) {
                    nameGenre.push(` ${dataGenre.genres.find(genre => genre.id === genreID).name}`)
                }
                dataYear = film.release_date.split("-")
                film[`genres`] = nameGenre;
                film[`year`] = dataYear[0];
                return film
            })
       
        } catch(error) {
            console.log(error) 
        }
        
        if (!resultFilm.length || !dataGenre.genres.length) {
            throw new Error("Alarm!!!");
        }
        cleartMessegeError()
        const numberPages = getButtonGallery(dataFilms, event)
        getCard(resultFilm, numberPages)
    
    } catch (error) {
        console.log(error)
    }
}

async function asyncGetInfoFilm(moviID) {
    try {
        const promiseInfoFilm = await getRequestFilm(moviID);
        const infoFilm = await promiseInfoFilm.json();

        if (moviID !== infoFilm.id) {
            throw new Error("Alarm!!!");
        }
     
        getCardFullInfoFilm(infoFilm)
    
    } catch (error) {
        console.log(error)
    }
}

async function asyncGetSearchFilm(valueInput, counter, resultFilm, event) {
    cleartMessegeError()
    try {
        const promiseDataFilm = await getFilmSearch(valueInput, counter);
        const dataFilms = await promiseDataFilm.json();
        const promiseDataGenre = await getGenre();
        const dataGenre = await promiseDataGenre.json();

        try {
            resultFilm = dataFilms.results.map(film => {
                const nameGenre = [];
                let dataYear;

                for (const genreID of film.genre_ids) {
                    nameGenre.push(` ${dataGenre.genres.find(genre => genre.id === genreID).name}`)
                }
                dataYear = film.release_date.split("-")
                film[`genres`] = nameGenre;
                film[`year`] = dataYear[0];
                return film
            })
       
        } catch(error) {
            console.log(error) 
        }
        
        if (!resultFilm.length || !dataGenre.genres.length) {
            throw new Error("Alarm!!!");
        }
        cleartMessegeError()
        const numberPages = getButtonGallery(dataFilms, event)
        getCard(resultFilm, numberPages, event)
        
    } catch (error) {
        console.log(error)
        getMessegeError()
    }
}

function getButtonGallery(dataFilms){
    
    const numberPages = [];
    let totalPages;

    if (dataFilms.total_pages >= 30) {
        totalPages = 30;
    } else {
        totalPages = dataFilms.total_pages
    }
        
    for (let i = 1; i <= totalPages; i += 1) {
        const number = {};
        number[`number`] = i;
        numberPages.push(number)
    }

    return numberPages
}





