import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText,$x } from "../../tool.js";
export function table() {
    waitForElement("#skuEditTable .myj-table", () => {
    const el = document.querySelector("#skuEditTable .myj-table")
    el.style.position = 'relative';
    el.style.left = '-300px';
    el.style.top = '0px';
})
}
