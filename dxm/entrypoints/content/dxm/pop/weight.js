import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function displayWeight() {
    waitForElement("#form_item_grossWeight", () => {
        try {
            let inputEl = document.querySelector("#form_item_grossWeight");
            let weightParentEl = inputEl.closest(".ant-form-item-control-input-content");
            // 创建显示重量的元素
            let weightEl = createElementEx("p", {
                className: "weightEl",
                text: `${inputEl.value * 1000}g`,
                parent: weightParentEl
            });
            // 绑定输入事件，实时更新重量
            inputEl.addEventListener("input", () => {
                weightEl.innerText = `${inputEl.value * 1000}g`;
            });
        } catch (error) {
            console.log("显示重量出错", error);
        }
    })

}