export function sendData() {
    window.parent.postMessage({ type: "sendData" }, "*");
}