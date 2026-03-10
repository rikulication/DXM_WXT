import {enableCSS} from "./background/css.js"

export default defineBackground(() => {
  enableCSS();
  console.log('Hello background!', { id: browser.runtime.id });
});
