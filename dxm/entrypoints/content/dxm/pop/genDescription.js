import $ from "jquery";
import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";

export function gen() {
    waitForElement('input.ant-radio-input[value="new"]', () => {

        try {
            let p = document.querySelector('input.ant-radio-input[value="new"]')
                .parentElement.parentElement;
            let new_btn = document.createElement("button");
            new_btn.className = "mybtn mybtn-info mybtn-sm myleft";
            new_btn.innerHTML = "一键生成描述";
            new_btn.addEventListener("click", async () => {
                console.log("一键生成新版描述");
                $('input.ant-radio-input[value="new"]').click();
                await sleep(500);
                $("button.button.btn-green.w-150").click();
                await sleep(800);
                $("span.link")
                    .filter(function () {
                        return $(this).text().trim() === "根据PC端描述一键生成";
                    })
                    .click();
                await sleep(500);
                $("button.ant-btn-primary")
                    .filter(function () {
                        return $(this).text().trim() === "确 定";
                    })
                    .click();
                await sleep(2000);
                $(".title-right button")
                    .filter(function () {
                        return $(this).text().trim() === "保存";
                    })
                    .click();
            });
            p.insertAdjacentElement("beforeend", new_btn);
        } catch (error) {
            console.log("一键生成描述加载错误", error);
        }
    });
}