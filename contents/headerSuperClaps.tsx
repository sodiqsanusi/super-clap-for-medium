import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor } from "plasmo"
import { handleClap } from "./footerSuperClaps";

export const config: PlasmoCSConfig = {
  matches: ["https:/\/*.medium.com/*", "https://medium.com/", "https://medium.com/*"],
  run_at: "document_end",
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`[data-testid='headerClapButton']`)

export const getShadowHostId = () => "header-superclaps";
let check = false;
const match_article = /https?:\/\/(medium\.com\/(p\/[a-zA-Z0-9]+|@[\w-]+\/[\w-]+|[\w-]+\/[\w-]+)|[\w-]+\.medium\.com\/[\w-]+)/;

chrome.runtime.onMessage.addListener((obj) => {
  const { lilac } = obj;
  check = match_article.test(lilac);
});

const HeaderSuperClaps = () => {
  if (!check) {
    return (false);
  }
  return (
    <div className="container" id="superContainers">
      <button
        onClick={() => handleClap("mid", "header")}
      >Clap 25</button>
      <button
        onClick={() => handleClap("high", "header")}
      >Clap 50</button>
    </div>
  )
}

export default HeaderSuperClaps