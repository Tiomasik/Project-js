
import { getCard } from "./index";
export { asyncGetFilm, getGenre };

function getGenre() {
    const url = "https://api.themoviedb.org/3/genre/movie/list";
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
    }
    const { key } = parameters;
    return fetch(`${url}?api_key=${key}`).then(response => response.json())
};

function getFilm(valueInput, counter) {
    const url = "https://api.themoviedb.org/3/trending/movie/week";
    const parameters = {
        key: '866c6d075a3e37e8cd8cfb5e85076bc4',
        nameFilm: valueInput,
    }
    const { key, nameFilm } = parameters;
    return fetch(`${url}?api_key=${key}&page=${counter}`)
    // return fetch(`${url}?api_key=${key}`)
};

async function asyncGetFilm(valueInput, counter, nameGenre, ttt) {
    try {
        const dataFilm = await getFilm(valueInput, counter);
        const dataCard = await dataFilm.json();
        
        if (!dataCard.results.length) {
            throw new Error("Alarm!!!");
        }
        getGenre().then(res => {
        console.log(res.genres)
        try {
            for (const tt of ttt) {
            nameGenre.push(res.genres.find(genre => genre.id === tt).name)
            console.log(nameGenre) 
        }
       
        } catch(error) {
            console.log(error) 
        }
    }).catch(error => console.log(error))
        getCard(dataCard)
    } catch (error) {
        console.log(error)
        console.log("Alarm!!!")
    }
}





