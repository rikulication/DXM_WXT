export async function local_data() {
    const files = {
        Tem1: "Template01.html",
        Tem2: "Template02.html",
        Tem3: "Template03.html",
        Tem4: "Template04.html",
        Tem5: "Template05.html",
        config: "config.txt",
        color: "color.txt",
        sku: "productInfo.txt",
    }
    const data = {};
    for(const [k, v] of Object.entries(files)) {
        const url = browser.runtime.getURL(v);
        const res = await fetch(url);
        const text = await res.text();
        data[k] = text;
    }
    
    return data
}