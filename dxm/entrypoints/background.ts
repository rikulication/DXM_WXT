import {getData} from "./background/getData.js"
import {enableCSS} from "./background/css.js"

export default defineBackground(() => {
  getData();
  enableCSS();
});
