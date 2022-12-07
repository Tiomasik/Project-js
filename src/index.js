// import './sass/index.scss';
import makeCard from "./template/get_card.hbs";
import makeButton from "./template/get_button.hbs";
// import makeLastButton from "./template/get_last_button.hbs";
import { asyncGetFilm } from "./getApiFilm";
export { getCard };
//import getFilm from './getApiFilm'
// import Film from './getApiFilm'

const refs = {
    formEl: document.querySelector('.form'),
    cardGallery: document.querySelector('.gallery .container'),
    cardBtn: document.querySelector('.btn-list'),
    pointLastBtn: document.querySelector('.link-last-points'),
    pointFirstBtn: document.querySelector('.link-first-points'),
    buttonLeft: document.querySelector('.btn-left'),
    buttonRight: document.querySelector('.btn-right'),
};

let valueInput;
let counter = 1;
const resultFilm = [];

asyncGetFilm(valueInput, counter, resultFilm)

console.log(refs.cardBtn)

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
    
    getCardButton(numberPages)
}

function getCardButton(numberPages) {
    const numberMiddlePages = []
    
    if (numberPages.length > counter) {
        for (let i = counter; i < counter + 5; i += 1) {
            numberMiddlePages.push(numberPages[i]);
            console.log(numberMiddlePages)
        }
    }
    if (counter === 1) {
    refs.buttonLeft.classList.toggle('visually-hidden')
    refs.pointFirstBtn.classList.toggle('visually-hidden')
    refs.cardBtn.insertAdjacentHTML("afterbegin", `<li class="link">
     <button type="button" class="footer-btn">${1}</button>
</li>`);
    refs.pointLastBtn.insertAdjacentHTML("beforebegin", numberMiddlePages.map(makeButton).join(''));
    refs.cardBtn.insertAdjacentHTML("beforeend", `<li class="link">
     <button type="button" class="footer-btn">${numberPages.length + 2}</button>
</li>`);
    // refs.pointLastBtn.classList.toggle('visually-hidden')
    }
}



