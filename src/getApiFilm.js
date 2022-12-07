
import { getCard } from "./index";
export { asyncGetFilm, getGenre };

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

async function asyncGetFilm(valueInput, counter, resultFilm, numberPages) {
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

        const numberPages = getButtonGallery(dataFilms)
        getCard(resultFilm, numberPages)

    } catch (error) {
        console.log(error)
        console.log("Alarm!!!")
    }
}

function getButtonGallery(dataFilms){
    
        let totalPages;
        const numberPages = [];

        if (dataFilms.total_pages >= 20) {
            totalPages = 20;
        } else {
            totalPages = dataFilms.total_pages
        }
        
    for (let i = 1; i < totalPages; i += 1) {
        const number = {};
        number[`number`] = i;
        console.log(number)
        numberPages.push(number)
        console.log(numberPages)
    }

    return numberPages
}





