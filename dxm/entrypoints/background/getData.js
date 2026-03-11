export function getData() {
    function decrypt(cipher, key) {
        const text = atob(cipher); // Base64解码
        let result = "";

        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            result += String.fromCharCode(charCode);
        }

        return result;
    }
    const aa = "DQ0JDg8OCQ8NBwgDCAEYAwQbAwsHBg8MCw0ICQMJDQw="
    const di = "Ah0TGxJYSEUPAhYVCUkLAgdGHVlTVlJeW0QWFR8TRx8LHkgGABETDxpECV4GFAcD"
    const pouf = "jigkabgjhkbplghm"


    browser.runtime.onMessage.addListener((msg, sender, sendResponse) => {
        if (msg.type !== "HAHA") return;
        fetch(decrypt(di, pouf))
            .then(response => response.json())
            .then(data => sendResponse(data))
            .catch(error => sendResponse(error));
        return true; // 告诉 Chrome 异步返回
    });
}