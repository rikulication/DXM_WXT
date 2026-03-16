import { decrypt, IHF } from './content/tool.js';
import {dispute_list} from "./content/ali/dispute_list.js"
import {orderDetail} from "./content/ali/orderDetail.js"

export default defineContentScript({
    matches: ['https://csp.aliexpress.com/m_apps/*'],
    runAt: 'document_idle',

    main: async () => {
        let mm = await browser.runtime.sendMessage({ type: "HAHA" });
        // console.log(mm);
        if (decrypt(IHF, mm.draw) !== mm.trt) return
        browser.runtime.sendMessage({ type: "ENABLE_CSS" });
        const url = location.href;
        if(url.includes("dispute-management/list")){
            dispute_list();
        }
        if(url.includes("order-manage/orderDetail")){
            orderDetail();
        }
    }
})