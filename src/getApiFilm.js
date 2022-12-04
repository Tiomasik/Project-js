
export { asyncGetFilm };

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

async function asyncGetFilm(valueInput, counter) {
    try {
        const dataFilm = await getFilm(valueInput, counter);
        const dataCard = await dataFilm.json();
        console.log(dataCard)
        return
    } catch(error) {
        console.log(error)
    }
}





