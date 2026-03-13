import { showToast, waitForElement, sleep, createElementEx, waitForElementWithObserver, waitForElementWithText, $x } from "../../tool.js";

export function description() {

    // 使用示例
    (async () => {
        const data = await requestData();
        console.log("injected 收到 content 数据:", data);
        const shopList = JSON.parse(data.config
            .replace(/\r\n/g, "\n")
            .replace(/\r/g, "\n")
            .trim()
            .split("\n")
            .filter((line) => line.trim() !== "")[1].replace(/'/g, '"'))
        


    })();
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