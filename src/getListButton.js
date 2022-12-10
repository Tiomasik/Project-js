export { getList };

function getList(numberMiddlePages) {
    return `<li class="item-btn">
    <button type="button" data-buttonid=1 class="footer-btn">${numberMiddlePages[0].number}</button>
</li>
<li class="item-btn">
    <button type="button" data-buttonid=1 class="footer-btn">${numberMiddlePages[1].number}</button>
</li>
<li class="item-btn">
    <button type="button" data-buttonid=1 class="footer-btn btn-active">${numberMiddlePages[2].number}</button>
</li>
<li class="item-btn">
    <button type="button" data-buttonid=1 class="footer-btn">${numberMiddlePages[3].number}</button>
</li>
<li class="item-btn">
    <button type="button" data-buttonid=1 class="footer-btn">${numberMiddlePages[4].number}</button>
</li>`
}