import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor, PlasmoGetInlineAnchorList } from "plasmo"
import { handleClap } from "./footerSuperClaps";
import { useStorage } from "@plasmohq/storage/hook";

export const config: PlasmoCSConfig = {
  matches: ["https:/\/*.medium.com/*", "https://medium.com/", "https://medium.com/*", "https://medium.com/*/*"],
  run_at: "document_end",
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(`[data-testid='headerClapButton']`);

export const getShadowHostId = () => "header-superclaps";
let check = true;
const match_article = /https?:\/\/(medium\.com\/(p\/[a-zA-Z0-9]+|@[\w-]+\/[\w-]+|[\w-]+\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)/;

chrome.runtime.onMessage.addListener((obj) => {
  const { lilac } = obj;
  check = match_article.test(lilac);
});

const HeaderSuperClaps = () => {
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

export default HeaderSuperClaps