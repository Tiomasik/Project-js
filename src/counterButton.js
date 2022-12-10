export { getActivButton };

function getActivButton(numberMiddlePages, counter) {
    
    let totalButton = ``
    let buttonCurrent
for (let i = 0; i < numberMiddlePages.length; i += 1) {
    if (counter === numberMiddlePages[i].number) {
       buttonCurrent = `<li class="item-btn">
    <a href="#headerID"v data-buttonid=1 class="footer-btn btn-active">${numberMiddlePages[i].number}</a>
</li>` 
    } else {
        buttonCurrent = `<li class="item-btn">
    <a href="#headerID" data-buttonid=1 class="footer-btn">${numberMiddlePages[i].number}</a>
</li>`
    }
    totalButton += buttonCurrent
    }
    return totalButton
}

