
export function orderDetail() {
    function runOrderDetail() {
        const routword = ".next-table-cell:nth-child(2) span";
        const rout = document.querySelector(routword);
        console.log(rout);

        if (!rout) return;

        const zhuanxian = "专线经济";
        const yanwen = "超级经济-燕文";
        const chaoji = "超级经济";
        const jianyi = "菜鸟特货专线－简易";
        const biaozhun = "菜鸟特货专线－标准";
        const biaokuai = "菜鸟特货专线－标快";
        const tongyou = "通邮";
        const shunyou = "顺友";
        const guahao = rout.textContent.includes(tongyou) || rout.textContent.includes(shunyou);

        const locword = ".chc-card-content";
        const loc = document.querySelector(locword);
        console.log('定位元素', loc);

        if (!loc) return;

        const tip = document.createElement("div");
        tip.style.cssText = "background-color: #ffef3d;padding:7px;font-size: large;";

        if (rout.textContent.includes(chaoji)) {
            tip.textContent = `10天内交航不赔付,
    俄罗斯、白俄罗斯、乌克兰、哈萨克斯坦大于10天未交航且35天未到目的国,
    其它国家大于10天未交航且55天未到目的国`;
        } else if (rout.textContent.includes(yanwen)) {
            tip.textContent = "10天内交航不赔付";
        } else if (rout.textContent.includes(zhuanxian)) {
            tip.textContent = "35天未到达目的国";
        } else if (rout.textContent.includes(jianyi)) {
            tip.textContent = "90天未妥投";
        } else if (rout.textContent.includes(biaozhun)) {
            tip.textContent = "欧洲90天/其余60天未妥投";
        } else if (rout.textContent.includes(biaokuai)) {
            tip.textContent = "巴西75天/其余60天未妥投";
        } else if (guahao) {
            tip.textContent = "全部国家60天未妥投\n（可申请自揽收起时间不超过110天)";
        }

        if (tip.textContent.trim()) {
            loc.insertAdjacentElement("beforebegin", tip);
        }
    }

    function showToast(message, duration = 1500) {
        let toast = document.getElementById("toast-message");
        if (!toast) {
            toast = document.createElement("div");
            toast.id = "toast-message";
            document.body.appendChild(toast);
        }

        toast.textContent = message;
        toast.classList.remove("show");
        void toast.offsetWidth; // 触发重排
        setTimeout(() => toast.classList.add("show"), 10);
        setTimeout(() => toast.classList.remove("show"), duration);
    }




    // 主逻辑入口，根据当前 URL 判断，等待对应元素出现后执行对应函数
    (function main() {
        setTimeout(() => {
            console.log('订单详情-------------------------------------------------------------');
            const url = window.location.href;
            console.log(url);
            runOrderDetail();
        }, 2000)
    })();
}