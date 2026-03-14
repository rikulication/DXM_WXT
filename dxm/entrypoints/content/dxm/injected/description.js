import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function description() {
    waitForElement("#sizeRef .ml-10", () => {
        // 使用示例
        (async () => {
            const data = await requestData();
            const shopList = JSON.parse(data.config
                .replace(/\r\n/g, "\n")
                .replace(/\r/g, "\n")
                .trim()
                .split("\n")
                .filter((line) => line.trim() !== "")[1].replace(/'/g, '"')).filter(Boolean)

            const temList = [data.Tem1, data.Tem2, data.Tem3, data.Tem4, data.Tem5];
            const discription_box = document.querySelector("#sizeRef .ml-10");
            const temBtns = []
            shopList.forEach((shopName, index) => {
                let sourceButton = document.querySelector(".cke_button__source");

                const tem_name = temList[index];
                const btn = createElementEx("button", {
                    className: "mybtn mybtn-rainbow mybtn-s myleft",
                    html: shopName,
                })

                temBtns.push(btn);
                btn.addEventListener("click", async () => {
                    // 源码按钮
                    let sourceButton = document.querySelector(".cke_button__source");
                    if (typeof CKEDITOR !== "undefined") {
                        let ckeId = getCkEditor();
                        let editor = CKEDITOR.instances[ckeId];
                        await sleep(500);
                        if (sourceButton.classList.contains("cke_button_on")) {
                            console.log("源码模式已开启");
                            editor.setData(tem_name); // 正确方法
                            sourceButton.click(); // 关闭源码模式，回到可视模式（如果需要）
                        } else if (sourceButton.classList.contains("cke_button_off")) {
                            console.log("源码模式未开启");
                            sourceButton.click(); // 先打开源码模式
                            setTimeout(() => {
                                editor.setData(tem_name); // 设置源码内容
                                sourceButton.click(); // 关闭源码模式，回到可视模式
                            }, 300);
                        } else {
                            console.log("无法判断按钮状态");
                        }
                    } else {
                        showToast("CKEDITOR未加载");
                    }
                });
            });
            temBtns.reverse().forEach((btn) => {
                discription_box.insertAdjacentElement("afterend", btn);
            });
        })();
    })

}
function requestData() {
    return new Promise((resolve) => {
        const requestId = Date.now(); // 简单生成请求 ID

        function handler(event) {
            if (!event.data || event.data.type !== "RESPONSE_DATA") return;
            if (event.data.requestId !== requestId) return;

            window.removeEventListener("message", handler);
            resolve(event.data.payload);
        }

        window.addEventListener("message", handler);

        // 发送请求
        window.postMessage({
            type: "REQUEST_DATA",
            requestId
        }, "*");
    });
}
function getCkEditor() {
    // 获取父元素
    const parentEl = document.querySelectorAll(
        "#describeInfo .ant-form-item-control-input-content"
    )[1];

    // 找到父元素下面的 textarea
    const textareaEl = parentEl.querySelector("textarea");

    // 获取 id 属性
    const textareaId = textareaEl ? textareaEl.id : null;
    return textareaId;
}