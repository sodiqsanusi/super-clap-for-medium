import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchorList } from "plasmo";
import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["https:/\/*.medium.com/*", "https://medium.com/", "https://medium.com/*", "https://medium.com/*/*"],
  run_at: "document_end",
}

export const getStyle = () => {
  const style = document.createElement("style");
  style.textContent = cssText;
  return style;
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(`[data-testid='footerClapButton']`);

export const getShadowHostId = () => "footer-superclaps";
let check = true;
const match_article = /https?:\/\/(medium\.com\/(p\/[a-zA-Z0-9]+|@[\w-]+\/[\w-]+|[\w-]+\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)/;

chrome.runtime.onMessage.addListener((obj) => {
  const { lilac } = obj;
  check = match_article.test(lilac);
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

export const handleClap = (range: "mid" | "high", from: "footer" | "header", clapCount) => {
  let amountOfClaps = parseInt(clapCount[range]);
  lilac();
  tryClap(amountOfClaps, from);
}

const FooterSuperClaps = () => {
  const [storedClaps] = useStorage("storedClaps");

  if (!check) {
    return (false);
  }
  return (
    <div className="container" id="superContainers">
      <button title="mid"
        onClick={() => handleClap("mid", "header", storedClaps)}
      >
        🔥
        {storedClaps && <span>{storedClaps.mid}</span>}
      </button>
      <button title="high"
        onClick={() => handleClap("high", "header", storedClaps)}
      >
        ⚡
        {storedClaps && <span>{storedClaps.high}</span>}
      </button>
    </div>
  )
}

export default FooterSuperClaps