
import Notiflix from 'notiflix';
import makeCard from "./template/get_card.hbs";
//import makeCardFilm from "./template/get_card_film.hbs";
// import makeActivButton from "./template/get_activ_button_middle.hbs";
import { asyncGetFilm } from "./getApiFilm";
import { asyncGetSearchFilm, asyncGetInfoFilm } from "./getApiFilm";
import { getActivButton } from "./counterButton";
import { getCardFilmInfo } from "./getCardFilm";
import { getCardFilmInfoImg } from "./getCardFilmImg";
import { getCardLibrary } from "./getCardGalleryLibrary";
export { getCard, getMessegeError, cleartMessegeError, getCardFullInfoFilm };


const refs = {
    isHomePage: document.querySelector('.nav__list__link-home'),
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
    messegeError: document.querySelector('.footer-error'),
    backdropWindow: document.querySelector('.backdrop'),
    modalWindowImg: document.querySelector('.modal-wind__film-img'),
    modalWindowList: document.querySelector('.modal-wind__film-list'),
    buttonAddWatch: document.querySelector('.card-film__btn .card-film__btn-active'),
    buttonAddQueue: document.querySelector('.card-film__btn .card-film__btn-passive'),
    buttonDelete: document.querySelector('.btn-delete'),
    buttonWatchGallery: document.querySelector('.btn-watch'),
    buttonQueueGallery: document.querySelector('.btn-queue'),
};

let valueInput;
let counter = 1;
const resultFilm = [];
let nameSearch = 0
let moviID
const resultInfoFilmGenre = [];
const resultInfoFilm = [];
// const filmsWatch = [];

if (refs.isHomePage.classList.contains('current')) {
    asyncGetFilm(valueInput, counter, resultFilm)
} else {
    refs.buttonFirst.classList.add('btn-active')
    refs.buttonFirst.classList.remove('visually-hidden')
    refs.buttonFirst.classList.remove('visually-hidden-mobile')
    refs.buttonLast.classList.add('visually-hidden')
    refs.buttonLast.classList.add('visually-hidden-mobile')
    refs.buttonLeft.classList.add('visually-hidden')
    refs.buttonLeft.classList.add('visually-hidden-mobile')
    refs.buttonPointsStart.classList.add('visually-hidden')
    refs.buttonPointsStart.classList.add('visually-hidden-mobile')
    refs.buttonRight.classList.add('visually-hidden')
    refs.buttonRight.classList.add('visually-hidden-mobile')
    refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
    refs.buttonPointsEnd.classList.add('visually-hidden')
    console.log(JSON.parse(localStorage.getItem("feedback-form-state")))
    getGalleryWatch()
}


refs.formEl.addEventListener('submit', sendForm);
refs.buttonGallery.addEventListener('click', getNextForm);
refs.cardGallery.addEventListener('click', getInfoFilm);
refs.backdropWindow.addEventListener('click', closeModalWindow);

refs.buttonAddWatch.addEventListener('click', addFilmWatch);
refs.buttonAddQueue.addEventListener('click', addFilmQueue);
refs.buttonDelete.addEventListener('click', deleteFilmWatch);

refs.buttonWatchGallery.addEventListener('click', getGalleryWatch);
refs.buttonQueueGallery.addEventListener('click', getGalleryQueue);
// refs.closeBtnWindow.addEventListener('click', closeModalWindow);

function getMessegeError() {
    refs.messegeError.classList.remove('visually-hidden') 
}

function cleartMessegeError() {
    refs.messegeError.classList.add('visually-hidden') 
}

function getInfoFilm(evt) {
    //console.log(evt.target.dataset.filmid)
    if (refs.isHomePage.classList.contains('current')) {
        refs.buttonAddWatch.classList.remove('visually-hidden')
        refs.buttonAddQueue.classList.remove('visually-hidden')
        refs.buttonDelete.classList.add('visually-hidden')
    } else {
        refs.buttonAddWatch.classList.add('visually-hidden')
        refs.buttonAddQueue.classList.add('visually-hidden')
        refs.buttonDelete.classList.remove('visually-hidden')
    }
    evt.preventDefault();
        moviID = Number(evt.target.dataset.filmid)
        asyncGetInfoFilm(moviID)
        refs.backdropWindow.classList.toggle('is-hidden') 
}

function addFilmWatch() {
        const changeFilm = JSON.parse(localStorage.getItem("watch-film"))
        const changeFilmID = changeFilm.findIndex((film) => film.id === resultInfoFilm[0].id)
        if (changeFilmID < 0) {
            if (!JSON.parse(localStorage.getItem("watch-film"))) {
            const filmsWatch = []
            const filmGenreLibrary = []
            filmsWatch.push(resultInfoFilm[0])
            filmGenreLibrary.push(resultInfoFilm[0].genres.map(genre => genre.name))
            localStorage.setItem("watch-film", JSON.stringify(filmsWatch))
            localStorage.setItem("watch-film-genre", JSON.stringify(filmGenreLibrary))
            } else {
            const filmsWatch = JSON.parse(localStorage.getItem("watch-film"))
            filmsWatch.push(resultInfoFilm[0])
            const filmGenreLibrary = JSON.parse(localStorage.getItem("watch-film-genre"))
            filmGenreLibrary.push(resultInfoFilm[0].genres.map(genre => genre.name))
            localStorage.setItem("watch-film", JSON.stringify(filmsWatch))
            localStorage.setItem("watch-film-genre", JSON.stringify(filmGenreLibrary))
            }
            Notiflix.Notify.success(`This movie has been successfully added to your library "Watch".`);
            refs.backdropWindow.classList.toggle('is-hidden')
        } else {
            Notiflix.Notify.failure(`Sorry, this movie has already been added to your library "Watch".`);
        }
}

function deleteFilmWatch() {
    if (refs.buttonDelete.classList.contains('is-watch-gallery')) {
        const filmsWatch = JSON.parse(localStorage.getItem("watch-film"))
        const filmGenreLibrary = JSON.parse(localStorage.getItem("watch-film-genre"))
        const filmID = filmsWatch.findIndex((film) => film.id === resultInfoFilm[0].id)
        filmsWatch.splice(filmID, 1)
        filmGenreLibrary.splice(filmID, 1)
        localStorage.setItem("watch-film", JSON.stringify(filmsWatch))
        localStorage.setItem("watch-film-genre", JSON.stringify(filmGenreLibrary))

        getGalleryWatch()  
    } else {
        const filmsWatch = JSON.parse(localStorage.getItem("queue-film"))
        const filmGenreLibrary = JSON.parse(localStorage.getItem("queue-film-genre"))
        const filmID = filmsWatch.findIndex((film) => film.id === resultInfoFilm[0].id)
        filmsWatch.splice(filmID, 1)
        filmGenreLibrary.splice(filmID, 1)
        localStorage.setItem("queue-film", JSON.stringify(filmsWatch))
        localStorage.setItem("queue-film-genre", JSON.stringify(filmGenreLibrary))

        getGalleryQueue()
    }
    
    refs.backdropWindow.classList.toggle('is-hidden')
}

function getGalleryWatch() {
    if (JSON.parse(localStorage.getItem("watch-film"))) {
       refs.cardGallery.innerHTML = getCardLibrary(JSON.parse(localStorage.getItem("watch-film")), JSON.parse(localStorage.getItem("watch-film-genre")))  
    } else {
    refs.cardGallery.innerHTML = ''
    }

    refs.buttonDelete.classList.add('is-watch-gallery')
    
}
function addFilmQueue() {
    const changeFilm = JSON.parse(localStorage.getItem("queue-film"))
    const changeFilmID = changeFilm.findIndex((film) => film.id === resultInfoFilm[0].id)
    if (changeFilmID < 0) {
        if (!JSON.parse(localStorage.getItem("queue-film"))) {
        const filmsWatch = []
        const filmGenreLibrary = []
        filmsWatch.push(resultInfoFilm[0])
        filmGenreLibrary.push(resultInfoFilm[0].genres.map(genre => genre.name))
        localStorage.setItem("queue-film", JSON.stringify(filmsWatch))
        localStorage.setItem("queue-film-genre", JSON.stringify(filmGenreLibrary))
        } else {
        const filmsWatch = JSON.parse(localStorage.getItem("queue-film"))
        filmsWatch.push(resultInfoFilm[0])
        const filmGenreLibrary = JSON.parse(localStorage.getItem("queue-film-genre"))
        filmGenreLibrary.push(resultInfoFilm[0].genres.map(genre => genre.name))
        localStorage.setItem("queue-film", JSON.stringify(filmsWatch))
        localStorage.setItem("queue-film-genre", JSON.stringify(filmGenreLibrary))
        }
        Notiflix.Notify.success(`This movie has been successfully added to your library "Queue".`);
        refs.backdropWindow.classList.toggle('is-hidden')
    } else {
        Notiflix.Notify.failure(`Sorry, this movie has already been added to your library "Queue".`);
    }
}



function getGalleryQueue() {
    if (JSON.parse(localStorage.getItem("watch-film"))) {
       refs.cardGallery.innerHTML = getCardLibrary(JSON.parse(localStorage.getItem("queue-film")), JSON.parse(localStorage.getItem("queue-film-genre")))  
    } else {
    refs.cardGallery.innerHTML = ''
    }

    refs.buttonDelete.classList.remove('is-watch-gallery')
}

function closeModalWindow(evt) {
    if (evt.target.dataset.modal == 'is-backdrop' || evt.target.dataset.close == "is-close") {
        refs.backdropWindow.classList.toggle('is-hidden')
    }
}

function sendForm(evt) {
    evt.preventDefault();
    valueInput = evt.target.elements[0].value;
    if (!valueInput) {
        counter = 1
        nameSearch = 0
        asyncGetFilm(valueInput, counter, resultFilm, evt)
    } else {
        nameSearch = 1
        counter = 1
        asyncGetSearchFilm(valueInput, counter, resultFilm)
    }
    
   evt.target.elements[0].value = ''
};

function getNextForm(evt) {
    if (evt.target.dataset.buttonid == 1) {
        counter = Number(evt.target.textContent)
        if (nameSearch == 1) {
           asyncGetSearchFilm(valueInput, counter, resultFilm) 
        } else {
            asyncGetFilm(valueInput, counter, resultFilm, evt)
        }
        console.log('I am button list!!!')  
    } else if (evt.target.dataset.buttonid == 2) {
        counter -= 4
        if (nameSearch == 1) {
           asyncGetSearchFilm(valueInput, counter, resultFilm) 
        } else {
             asyncGetFilm(valueInput, counter, resultFilm, evt)
        }
        console.log('I am button left point!!!')
    } else if (evt.target.dataset.buttonid == 3) {
        counter += 4
        if (nameSearch == 1) {
           asyncGetSearchFilm(valueInput, counter, resultFilm) 
        } else {
             asyncGetFilm(valueInput, counter, resultFilm, evt)
        }
        console.log('I am button right point!!!')
    } else if (evt.target.dataset.buttonid == 4) {
        counter -= 1
        if (nameSearch == 1) {
           asyncGetSearchFilm(valueInput, counter, resultFilm) 
        } else {
             asyncGetFilm(valueInput, counter, resultFilm, evt)
        }
        console.log('I am button left!!!')
    } else if (evt.target.dataset.buttonid == 5) {
        counter += 1
        if (nameSearch == 1) {
           asyncGetSearchFilm(valueInput, counter, resultFilm) 
        } else {
             asyncGetFilm(valueInput, counter, resultFilm, evt)
        }
        console.log('I am button right!!!')
    }
}


function getCard(resultFilm, numberPages, event) {
    refs.cardGallery.innerHTML = '';
    console.log(resultFilm)
    console.log(numberPages)
    refs.cardGallery.innerHTML = resultFilm.map(makeCard).join('');
    getGalleryBtn(numberPages)
}

function getCardFullInfoFilm(infoFilm, videoFilm) {
    resultInfoFilmGenre.splice(0, resultInfoFilmGenre.length);
    resultInfoFilmGenre.push(infoFilm.genres)
    resultInfoFilm.splice(0, resultInfoFilm.length);
    resultInfoFilm.push(infoFilm)
    console.log(resultInfoFilm)
    const resultGenresFilm = resultInfoFilmGenre[0].map(genre => genre.name);
    // resultGenresFilm.push(infoFilm.genres)
    console.log(resultGenresFilm)
    refs.modalWindowList.innerHTML = getCardFilmInfo(infoFilm, resultGenresFilm, videoFilm)
    refs.modalWindowImg.innerHTML = getCardFilmInfoImg(infoFilm)
    //refs.modalWindow.innerHTML = resultInfoFilm.map(makeCardFilm).join('');
}

function getGalleryBtn(numberPages) {
    refs.buttonList.innerHTML = '';
    refs.buttonLast.innerHTML = '';
    const numberMiddlePages = []

    console.log(numberMiddlePages)
    
    if (numberPages.length < 8 && numberPages.length >= counter) {
        for (let i = 1; i < numberPages.length; i += 1) {
            numberMiddlePages.push(numberPages[i]);
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
            refs.buttonFirst.classList.add('btn-active')
            refs.buttonFirst.classList.remove('visually-hidden')
            refs.buttonFirst.classList.remove('visually-hidden-mobile')
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            //refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        } else if (counter === 1 && numberPages.length === counter) {
            refs.buttonFirst.classList.add('btn-active')
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
        } else if (counter > 1 && numberPages.length > counter) {
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            //refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        } else {
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonLast.classList.add('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            //refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
        }
    }
    else {
        if (counter == 1) {
            refs.buttonFirst.classList.add('btn-active')
            refs.buttonFirst.classList.remove('visually-hidden-mobile')
            refs.buttonFirst.classList.remove('visually-hidden-mobile')
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonLeft.classList.add('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            refs.buttonLast.innerHTML = `<a href="#headerID" data-buttonid=1 class="footer-btn">${numberPages.length}</a>`
            refs.buttonLast.classList.add('visually-hidden-mobile')
            // refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            //refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" data-buttonid=1 class="footer-btn">${numberPages.length}</button>`);
        } else if (counter > 1 && counter < numberPages.length && counter < 5) { 
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonFirst.classList.add('visually-hidden-mobile')
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.add('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            refs.buttonLast.innerHTML = `<a href="#headerID" data-buttonid=1 class="footer-btn">${numberPages.length}</a>`
            refs.buttonLast.classList.add('visually-hidden-mobile')
           // refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            //refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" data-buttonid=1 class="footer-btn">${numberPages.length}</button>`);
        } else if (counter < numberPages.length - 3 && counter >= 5 ) { 
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonFirst.classList.add('visually-hidden-mobile')
            refs.buttonPointsStart.classList.add('visually-hidden-mobile')
            refs.buttonPointsEnd.classList.add('visually-hidden-mobile')
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.remove('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            refs.buttonLast.innerHTML = `<a href="#headerID" data-buttonid=1 class="footer-btn">${numberPages.length}</a>`
            refs.buttonLast.classList.add('visually-hidden-mobile')
            // refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            //refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" data-buttonid=1 class="footer-btn">${numberPages.length}</button>`);
        } else if (counter >= numberPages.length - 3 && counter < numberPages.length) { 
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.remove('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
            refs.buttonLast.innerHTML = `<a href="#headerID" data-buttonid=1 class="footer-btn">${numberPages.length}</a>`
             refs.buttonLast.classList.remove('visually-hidden-mobile')
            //refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            //refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" data-buttonid=1 class="footer-btn">${numberPages.length}</button>`);
        } else {
            refs.buttonFirst.classList.remove('btn-active')
            refs.buttonLast.classList.remove('visually-hidden')
            refs.buttonLeft.classList.remove('visually-hidden')
            refs.buttonPointsStart.classList.remove('visually-hidden')
            refs.buttonRight.classList.add('visually-hidden')
            refs.buttonPointsEnd.classList.add('visually-hidden')
            refs.buttonList.innerHTML = getActivButton(numberMiddlePages, counter)
           // refs.buttonList.insertAdjacentHTML("beforeend", numberMiddlePages.map(makeButton).join(''));
            refs.buttonLast.innerHTML = `<a href="#headerID" data-buttonid=1 class="footer-btn btn-active">${numberPages.length}</a>`
            refs.buttonLast.classList.remove('visually-hidden-mobile')
            //refs.buttonLast.insertAdjacentHTML("beforeend", `<button type="button" data-buttonid=1 class="footer-btn">${numberPages.length}</button>`);
        }
    }

    // event.classList.toggle('btn-active')
    //     console.log(event)
}




