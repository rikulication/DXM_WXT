export function inject() {
    
    function injectScript(file) {
        const script = document.createElement("script");
        script.src = chrome.runtime.getURL(file);

        script.type = "text/javascript";
        script.onload = () => script.remove(); // 注入后立即移除
        (document.head || document.documentElement).appendChild(script);
    }

    injectScript("description.js");
}

export function sendData(data) {
    // 监听 injected 的请求
    window.addEventListener("message", async (event) => {
        // 只处理自己的消息
        if (event.source !== window) return;
        if (!event.data || event.data.type !== "REQUEST_DATA") return;

        // 回传给 injected
        window.postMessage({
            type: "RESPONSE_DATA",
            requestId: event.data.requestId, // 对应请求
            payload: data
        }, "*");
    });
}