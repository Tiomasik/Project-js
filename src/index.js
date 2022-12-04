
import { asyncGetFilm } from "./getApiFilm";
//import getFilm from './getApiFilm'
// import Film from './getApiFilm'

const refs = {
    formEl: document.querySelector('.form'),
    cardGallery: document.querySelector('.gallery__films'),
};
let valueInput;
let counter = 10;

console.log(refs.formEl)

refs.formEl.addEventListener('submit', sendForm);


function sendForm(evt) {
    evt.preventDefault();
    valueInput = evt.target.elements[0].value;
    console.log(valueInput)    // asyncGetAxios(valueInput, counter, maxOnPage)
    asyncGetFilm(valueInput, counter)
};

// async function asyncGetFilm(valueInput) {
//     try {
//         const dataFilm = await getFilm(valueInput);
//         const dataCard = await dataFilm.json();
//         console.log(dataCard)
//         return
//     } catch(error) {
//         console.log(error)
//     }
//     // try {
//     //     const dataCard = await getFilm(valueInput)

//     //     if (!dataCard.data.hits.length) {
//     //         throw new Error("Alarm!!!");
//     //     }
//     //     if (counter < 2) {
//     //         getCard(dataCard)
//     //     return    
//     //     }
//     //     getCardMore(dataCard)
//     // } catch(error) {
//     //     Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
//     //     clearAll()
//     // }
// }

// function getFilm(valueInput) {
//     const url = "https://api.themoviedb.org/3/movie/76341";
//     const parameters = {
//         key: '866c6d075a3e37e8cd8cfb5e85076bc4',
//         nameFilm: valueInput,
//     }
//     const { key, nameFilm } = parameters;
//     return fetch(`${url}?api_key=${key}`)
// };

