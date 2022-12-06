
import makeCard from "./template/get_card.hbs";
import makeButton from "./template/get_button.hbs";
import { asyncGetFilm, getGenre } from "./getApiFilm";
export { getCard };
//import getFilm from './getApiFilm'
// import Film from './getApiFilm'

const refs = {
    formEl: document.querySelector('.form'),
    cardGallery: document.querySelector('.gallery .container'),
    cardBtn: document.querySelector('.footer .container'),
};
let valueInput;
let counter = 1;
const resultFilm = [];

asyncGetFilm(valueInput, counter, resultFilm)

console.log(refs.cardGallery)

refs.formEl.addEventListener('submit', sendForm);


function sendForm(evt) {
    evt.preventDefault();
    valueInput = evt.target.elements[0].value;
        // asyncGetAxios(valueInput, counter, maxOnPage)

    counter = valueInput;
    asyncGetFilm(valueInput, counter, resultFilm)
};

function getCard(resultFilm, numberPages) {
    refs.cardGallery.innerHTML = '';
    console.log(resultFilm)
    console.log(numberPages)
    refs.cardGallery.innerHTML = resultFilm.map(makeCard).join('');
    refs.cardBtn.innerHTML = numberPages.map(makeButton).join('');
}



