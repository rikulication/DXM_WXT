import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function size() {
    let size_box = createElementEx("div", {
        className: "button_box"
    })
    // 尺寸
    const size_list = [
        "10*5*5",
        "10*10*5",
        "15*10*5",
        "15*15*5",
        "15*15*10",
        "20*15*15",
        "20*20*15",
        "25*20*15",
        "25*25*15",
        "25*25*20",
    ].map(size =>
        createElementEx("button", {
            className: "mybtn mybtn-sm mybtn-outline-info center",
            html: size,
        })
    );
    waitForElement('#packageInfo label[title="包装后尺寸"]', () => {
        const positionEl = $x(`//div[@id="packageInfo"]//label[@title="包装后尺寸"]/ancestor::div[contains(@class,"ant-form-item ")]`)[0]

        size_list.forEach((el) => {
            const s = el.textContent
            const l = s.split("*")[0]
            const w = s.split("*")[1]
            const h = s.split("*")[2]
            el.addEventListener("click", () => {
                let l_el = document.querySelectorAll(`#packageInfo .flex-y-center input`)[0]
                let w_el = document.querySelectorAll(`#packageInfo .flex-y-center input`)[1]
                let h_el = document.querySelectorAll(`#packageInfo .flex-y-center input`)[2]
                let len_list = document.querySelectorAll(`tbody input[placeholder="长"]`)
                let wid_list = document.querySelectorAll(`tbody input[placeholder="宽"]`)
                let height_list = document.querySelectorAll(`tbody input[placeholder="高"]`)
                l_el.value = l
                w_el.value = w
                h_el.value = h
                l_el.dispatchEvent(new Event("input", { bubbles: true }))
                w_el.dispatchEvent(new Event("input", { bubbles: true }))
                h_el.dispatchEvent(new Event("input", { bubbles: true }))
                len_list.forEach((item) => {
                    item.value = l
                    item.dispatchEvent(new Event("input", { bubbles: true }))
                })
                wid_list.forEach((item) => {
                    item.value = w
                    item.dispatchEvent(new Event("input", { bubbles: true }))
                })
                height_list.forEach((item) => {
                    item.value = h
                    item.dispatchEvent(new Event("input", { bubbles: true }))
                })

            });
            size_box.appendChild(el);
        });
        positionEl.insertAdjacentElement("afterend", size_box)

    })
}