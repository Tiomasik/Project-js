
import makeCard from "./template/get_card.hbs";
import { asyncGetFilm, getGenre } from "./getApiFilm";
export { getCard };
//import getFilm from './getApiFilm'
// import Film from './getApiFilm'

const refs = {
    formEl: document.querySelector('.form'),
    cardGallery: document.querySelector('.gallery .container'),
};
let valueInput;
let counter = 10;
const nameGenre = [];
const ttt = [99, 80]


console.log(refs.cardGallery)

refs.formEl.addEventListener('submit', sendForm);


function sendForm(evt) {
    evt.preventDefault();
    valueInput = evt.target.elements[0].value;
    console.log(valueInput)    // asyncGetAxios(valueInput, counter, maxOnPage)


    asyncGetFilm(valueInput, counter, nameGenre, ttt)
};

function getCard(resulte) {
    refs.cardGallery.innerHTML = '';
    console.log(resulte.results)
    refs.cardGallery.innerHTML = resulte.results.map(makeCard).join('');
}



