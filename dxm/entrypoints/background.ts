import {enableCSS} from "./background/css.js"
import {getData} from "./background/getData.js"

export default defineBackground(() => {
  getData();
  enableCSS();
});
