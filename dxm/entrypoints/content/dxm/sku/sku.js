
export function sku() {
    function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
    }

    function createElementEx(tagName, options = {}) {
        const el = document.createElement(tagName);

        if (options.className) el.className = options.className;
        if (options.text) el.textContent = options.text;
        if (options.html) el.innerHTML = options.html;

        if (options.attrs) {
            for (const [k, v] of Object.entries(options.attrs)) {
                el.setAttribute(k, v);
            }
        }

        if (options.style) {
            Object.assign(el.style, options.style);
        }

        if (options.myEvent) {
            for (const [evt, handler] of Object.entries(options.myEvent)) {
                el.addEventListener(evt, handler);
            }
        }

        // 插入逻辑
        if (options.insertAdjacent && options.insertAdjacent.target) {
            const { target, position } = options.insertAdjacent;
            if (["beforebegin", "afterbegin", "beforeend", "afterend"].includes(position)) {
                target.insertAdjacentElement(position, el);
            }
        } else if (options.insertAfter && options.insertAfter.parentNode) {
            options.insertAfter.parentNode.insertBefore(el, options.insertAfter.nextSibling);
        } else if (options.insertBefore && options.insertBefore.parentNode) {
            options.insertBefore.parentNode.insertBefore(el, options.insertBefore);
        } else if (options.parent) {
            options.parent.appendChild(el);
        }

        return el;
    }

    function showToast(message, duration = 1500) {
        let toast = document.getElementById("toast-message");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-message";
            toast.className = "toast-message";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.remove("show");
        void toast.offsetWidth;
        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => toast.classList.remove("show"), duration);
    }

    /***************************************************
     * 功能按钮对应的方法
     **************************************************/
    async function copyTotal() {
        let sku_list = Array.from(document.querySelectorAll("span.goodsSKUName"))
            .map(el => el.textContent.trim())
        let price_list = Array.from(document.querySelectorAll('div[data-name="price"] span'))
            .map(el => el.textContent.trim())
        let weight_list = Array.from(document.querySelectorAll('div[data-name="weight"] span'))
            .map(el => el.textContent.trim())

        try {
            const total_list = sku_list.map((_, i) => [sku_list[i], price_list[i], weight_list[i]])
            console.log(total_list);
            const text = total_list
                .map(row => row.join("\t"))
                .join("\n");
            console.log(text);

            await navigator.clipboard.writeText(text);

            showToast("所有信息已复制!");
        } catch {
            showToast("复制失败");
        }
    }
    async function copyImageLinks() {
        let sku_list = Array.from(
            document.querySelectorAll(".img-box img.imgcss.img-css.lazy")
        )
            .map(el => el.src.split("?")[0])
            .join("\n");

        try {
            await navigator.clipboard.writeText(sku_list);
            showToast("图片链接已复制!");
        } catch {
            showToast("复制失败");
        }
    }

    async function copySKU() {
        let sku_list = Array.from(document.querySelectorAll("span.goodsSKUName"))
            .map(el => el.textContent.trim())
            .join("\n");

        try {
            await navigator.clipboard.writeText(sku_list);
            showToast("SKU 已复制!");
        } catch {
            showToast("复制失败");
        }
    }

    async function copyPrice() {
        let price_list = Array.from(document.querySelectorAll('div[data-name="price"] span'))
            .map(el => el.textContent.trim())
            .join("\n");

        try {
            await navigator.clipboard.writeText(price_list);
            showToast("价格已复制!");
        } catch {
            showToast("复制失败");
        }
    }

    async function copyWeight() {
        let weight_list = Array.from(document.querySelectorAll('div[data-name="weight"] span'))
            .map(el => el.textContent.trim())
            .join("\n");

        try {
            await navigator.clipboard.writeText(weight_list);
            showToast("重量已复制!");
        } catch {
            showToast("复制失败");
        }
    }

    /***************************************************
     * 核心：按钮注入函数（自动去重 + 可重复调用）
     **************************************************/

    function injectButtons() {
        const container = document.querySelector("#myTabContentOne .page-button-box");
        if (!container) return;

        // 防止重复插入（任何一个按钮存在就视为已插入）
        if (container.querySelector(".mybtn-inserted")) return;

        const btnConfigs = [
            { text: "复制图片链接", class: "mybtn-outline-primary", handler: copyImageLinks },
            { text: "复制SKU", class: "mybtn-outline-primary", handler: copySKU },
            { text: "复制价格", class: "mybtn-outline-success", handler: copyPrice },
            { text: "复制重量", class: "mybtn-outline-warning", handler: copyWeight },
            { text: "sku|价格|重量", class: "mybtn-outline-warning", handler: copyTotal }
        ];

        btnConfigs.forEach(cfg => {
            createElementEx("button", {
                html: cfg.text,
                className: `mybtn myleft mybtn-lg mybtn-inserted ${cfg.class}`,
                parent: container,
                myEvent: { click: cfg.handler }
            });
        });

        console.log("按钮已注入");
    }

    /***************************************************
     * 观察页面局部刷新自动恢复按钮
     **************************************************/

    const globalObserver = new MutationObserver(() => {
        const box = document.querySelector("#myTabContentOne .page-button-box");
        if (box && !box.querySelector(".mybtn-inserted")) {
            console.log("检测到按钮消失 → 自动恢复");
            injectButtons();
        }
    });

    globalObserver.observe(document.body, {
        childList: true,
        subtree: true
    });

    /***************************************************
     * 初次等元素加载后插入按钮
     **************************************************/

    function waitForElement(selector, callback) {
        const observer = new MutationObserver(() => {
            const el = document.querySelector(selector);
            if (el) {
                observer.disconnect();
                callback(el);
            }
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }

    waitForElement("#myTabContentOne .page-button-box", () => {
        injectButtons();
    });
}