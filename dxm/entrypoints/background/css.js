export function enableCSS() {
    browser.runtime.onMessage.addListener((msg, sender) => {
        console.log("样式已加载");
        if (msg.type === "ENABLE_CSS") {
            chrome.scripting.insertCSS({
                target: { tabId: sender.tab.id },
                files: ["dxm.css"]
            });
        }
    });
}