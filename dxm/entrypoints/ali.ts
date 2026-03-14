import { decrypt, IHF } from './content/tool.js';


export default defineContentScript({
    matches: ['*://*.aliexpress.com/*'],
    runAt: 'document_idle',

    main: async () => {
        let mm = await browser.runtime.sendMessage({ type: "HAHA" });
        // console.log(mm);
        if (decrypt(IHF, mm.draw) !== mm.trt) return
        browser.runtime.sendMessage({ type: "ENABLE_CSS" });
        const url = location.href;
        
    }
})