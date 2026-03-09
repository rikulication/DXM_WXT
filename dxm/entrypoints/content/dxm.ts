
export default defineContentScript({
  matches: ['*://www.dianxiaomi.com/*'],
  main() {
    console.log('Hello content.');
    console.log('Hello content.');
    console.log("12222");
  },
});
