import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https:/\/*.medium.com/*", "https://medium.com/", "https://medium.com/*"],
  run_at: "document_end",
}

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`[data-testid='footerClapButton']`);

export const getShadowHostId = () => "footer-superclaps";
let check = false;
const match_article = /https?:\/\/(medium\.com\/(p\/[a-zA-Z0-9]+|@[\w-]+\/[\w-]+|[\w-]+\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)/;

chrome.runtime.onMessage.addListener((obj) => {
  const { lilac } = obj;
  check = match_article.test(lilac);
  console.log(check);
});

let tryClap = null;

const lilac = () => {
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

  tryClap = (num = 1, elem: any = "header") => {
    if (elem == "footer") {
      elem = footerClapButton;
    } else if (elem == "header") {
      elem = headerClapButton;
    } else {
      elem = headerClapButton;
    }
    elem.dispatchEvent(clap);
    setTimeout(() => {
      elem.dispatchEvent(stopClap);
    }, 200 * num);
  }
}

export const handleClap = (range: "mid" | "high", from: "footer" | "header") => {
  let amountOfClaps = range == "mid" ? 25 : 50;
  lilac();
  tryClap(amountOfClaps, from);
}

const FooterSuperClaps = () => {
  if (!check) {
    return (false);
  }
  return (
    <div className="container" id="superContainers">
      <button
        onClick={() => handleClap("mid", "footer")}
      >Clap 25</button>
      <button
        onClick={() => handleClap("high", "footer")}
      >Clap 50</button>
    </div>
  )
}

export default FooterSuperClaps