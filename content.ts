// import type { PlasmoCSConfig } from "plasmo";
// const match_article = "/^https:\/\/(?:[a-zA-Z0-9-]+\.medium\.com\/|medium\.com\/(?:@?[a-zA-Z0-9-]+\/|[a-zA-Z0-9-]+\/))[a-zA-Z0-9-]+(-[a-zA-Z0-9]{12})?$/";
// export const config: PlasmoCSConfig = {
//   matches: ["https://*.medium.com/*", "https://medium.com/*/*"],
//   exclude_matches: ["https://medium.com/"],
//   run_at: "document_end",
//   all_frames: true,
//   world: "MAIN",
// }

// const headerClapButton = document.querySelector("[data-testid='headerClapButton']");
// const footerClapButton = document.querySelector("[data-testid='footerClapButton']");

// const clap = new MouseEvent('mousedown', {
//   bubbles: true,
//   cancelable: true,
//   view: window
// });
// const stopClap = new MouseEvent('mouseup', {
//   bubbles: true,
//   cancelable: true,
//   view: window
// });

// const tryClap = (num = 1, elem = <fo></fo>oterClapButton) => {
//   elem.dispatchEvent(clap);
//   //* Stop clapping after just one clap
//   setTimeout(() => {
//     elem.dispatchEvent(stopClap);
//   }, 200 * num);
// }

// console.log("Loaded auto claps here!");
// setTimeout(() => {
//   tryClap(2);
// }, 2000);

const initApplication = () => {
  const headerClapButton = document.querySelector("[data-testid='headerClapButton']");
  const footerClapButton = document.querySelector("[data-testid='footerClapButton']");

  const clap = new MouseEvent('mousedown', {
    bubbles: true,
    cancelable: true,
    view: window
  });
  const stopClap = new MouseEvent('mouseup', {
    bubbles: true,
    cancelable: true,
    view: window
  });

  const tryClap = (num = 1, elem = footerClapButton) => {
    elem.dispatchEvent(clap);
    //* Stop clapping after just one clap
    setTimeout(() => {
      elem.dispatchEvent(stopClap);
    }, 200 * num);
  }

  return tryClap;
};
