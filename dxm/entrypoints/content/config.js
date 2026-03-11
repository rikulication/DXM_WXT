
export async function get_config() {
  (async function () {
    window.f = {
      // Tem1: "Template01.html",
      // Tem2: "Template02.html",
      // Tem3: "Template03.html",
      // Tem4: "Template04.html",
      // Tem5: "Template05.html",
      config: "config.txt",
      // custom_css: "css/dxm.css"
      color: "color.txt",
      sku: "productInfo.txt",
    };

    async function loadFiles(fileMap) {
      const entries = await Promise.all(
        Object.entries(fileMap).map(async ([key, path]) => {
          const text = await (await fetch(chrome.runtime.getURL(path))).text();
          return [key, text];
        })
      );
      return Object.fromEntries(entries);
    }

    const data = await loadFiles(f);

    setTimeout(() => {
      window.postMessage(
        {
          source: "my-extension",
          payload: {
            type: "TEMPLATE_DATA",
            data,
          },
        },
        "*"
      );
    }, 500);
    window.templateData = data;

    //数据处理
    //config文件数据处理
    let info = data.config
      .replace(/\r\n/g, "\n")
      .replace(/\r/g, "\n")
      .trim()
      .split("\n")
      .filter((line) => line.trim() !== "");
    window.n = info[0].split(/[:：]/)[1];
    window.brand = info[2].split(/[:：]/)[1];
    // window.myStyle = data.custom_css;


  })();

}
