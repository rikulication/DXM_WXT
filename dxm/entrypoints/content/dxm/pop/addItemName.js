import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver } from "../../tool.js";
import $ from "jquery";

export function addItemName() {
    waitForElement("#productProductInfo .attr-options", async () => {
        let positionEl = document.querySelector("#productProductInfo .video-operate");
        // 创建输入框
        let fill_box = createElementEx("textarea", {
            parent: positionEl,
            className: "input_att pop_fill",
            myEvent: {
                input: (e) => {
                    let el = e.target;
                    el.style.height = "auto";
                    el.style.height = el.scrollHeight + "px";
                }
            }
        });

        // 创建按钮
        let fill_btn = createElementEx("button", {
            parent: positionEl,
            className: "mybtn mybtn-sm mybtn-success jz",
            html: "填充内容"
        });

        let copy_btn = createElementEx("button", {
            parent: positionEl,
            className: "mybtn mybtn-sm mybtn-warning jz",
            html: "复制"
        });

        // 按钮点击逻辑
        copy_btn.addEventListener("click", () => {
            let l = document.querySelectorAll("#productProductInfo .cur-table .ant-space-item input")
            let ls = Array.from(l).map(el => el.value).join("\n")
            console.log(ls);
            navigator.clipboard.writeText(ls).then(() => {
                showToast(`已复制`);
            }).catch(err => {
                console.log("复制失败:", err);
                showToast("复制失败");
            });
        })
        fill_btn.addEventListener("click", async () => {
            let list = fill_box.value.split(/[;；\n\r]+/).filter(Boolean);
            let inputEls = document.querySelectorAll("#productProductInfo .cur-table .ant-space-item input");

            if (inputEls.length !== list.length) {
                showToast(`输入数量(${list.length})与输入框数量(${inputEls.length})不一致，请检查！`, 3000);
                return;
            }

            for (let i = 0; i < inputEls.length; i++) {
                let el = inputEls[i];
                el.value = list[i].trim();
                el.dispatchEvent(new Event("input", { bubbles: true }));
                await sleep(50); // 给页面反应时间
            }

            showToast("填充完成 ✅", 2000);
        });
    })
}
