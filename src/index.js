
import makeCard from "./template/get_card.hbs";
import makeButton from "./template/get_button.hbs";
// import makeLeftButton from "./template/get_left_button.hbs";
import { asyncGetFilm } from "./getApiFilm";
export { getCard };
//import getFilm from './getApiFilm'
// import Film from './getApiFilm'

const refs = {
    formEl: document.querySelector('.form'),
    cardGallery: document.querySelector('.gallery .container'),
    buttonGallery: document.querySelector('.footer .container'),
    buttonLeft: document.querySelector('.btn-left'),
    buttonRight: document.querySelector('.btn-right'),
    buttonFirst: document.querySelector('.btn-first'),
    buttonList: document.querySelector('.btn-list'),
    buttonPointsStart: document.querySelector('.btn-points-start'),
    buttonPointsEnd: document.querySelector('.btn-points-end'),
    buttonLast: document.querySelector('.block-last-btn'),
};

let valueInput;
let counter = 8;
const resultFilm = [];
let totalPages;

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
    refs.buttonList.innerHTML = '';
    refs.buttonLast.innerHTML = '';
    const numberMiddlePages = []
    
    if (numberPages.length < 8 && numberPages.length >= counter) {
        for (let i = 1; i < numberPages.length; i += 1) {
            numberMiddlePages.push(numberPages[i]);
            console.log(1)
        } 
    } else if (numberPages.length >= 7 && counter < 5) {
        for (let i = 1; i < 6; i += 1) {
            numberMiddlePages.push(numberPages[i]);
        }
    } else if (numberPages.length >= 7 && counter > numberPages.length - 3) {
        for (let i = numberPages.length - 6; i < numberPages.length - 1; i += 1) {
            numberMiddlePages.push(numberPages[i]);
        } 
    } else {
        for (let i = counter - 3; i < counter + 2; i += 1) {
            numberMiddlePages.push(numberPages[i]);
        } 
    } 

    console.log(numberMiddlePages)

    if (numberPages.length < 8 && numberPages.length >= counter) {
        if (counter === 1 && numberPages.length !== counter) {
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        } else if (counter === 1 && numberPages.length === counter) { 
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
        } else if (counter > 1 && numberPages.length > counter) { 
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        } else {
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        }
    } else {
        if (counter === 1) {
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
        } else if (counter > 1 && counter < numberPages.length && counter < 5) { 
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
        } else if (counter > 1 && counter < numberPages.length - 3 && counter >= 5 ) { 
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
        } else if (counter >= numberPages.length - 3 && counter < numberPages.length) { 
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
        } else {
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
        }
    }

    //  if (numberPages.length < 8 && numberPages.length >= counter) {
    //     if (counter === 1) {
    //         refs.buttonLeft.classList.add('visually-hidden')
    //         refs.buttonPointsStart.classList.add('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.add('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //     } else if (counter > 1 && numberPages.length > counter) { 
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.add('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.add('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //     } else {
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.add('visually-hidden')
    //         refs.buttonRight.classList.add('visually-hidden')
    //         refs.buttonPointsEnd.classList.add('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //     }
    // } else {
    //     if (counter === 1) {
    //         refs.buttonLeft.classList.add('visually-hidden')
    //         refs.buttonPointsStart.classList.add('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.remove('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //         refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
    //     } else if (counter > 1 && counter < numberPages.length && counter < 5) { 
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.add('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.remove('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //         refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
    //     } else if (counter > 1 && counter < numberPages.length - 3 && counter >= 5 ) { 
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.remove('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.remove('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //         refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
    //     } else if (counter >= numberPages.length - 3 && counter < numberPages.length) { 
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.remove('visually-hidden')
    //         refs.buttonRight.classList.remove('visually-hidden')
    //         refs.buttonPointsEnd.classList.add('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //         refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
    //     } else {
    //         refs.buttonLeft.classList.remove('visually-hidden')
    //         refs.buttonPointsStart.classList.remove('visually-hidden')
    //         refs.buttonRight.classList.add('visually-hidden')
    //         refs.buttonPointsEnd.classList.add('visually-hidden')
    //         refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
    //         refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" class="footer-btn">${numberPages.length}</button>`);
    //     }
    // }

}


