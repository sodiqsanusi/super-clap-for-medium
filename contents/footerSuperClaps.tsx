import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"

import "./lilac.css";
 
export const config: PlasmoCSConfig = {
  matches: ["https:/\/*.medium.com/*", "https://medium.com/*/*"],
  exclude_matches: ["https://medium.com/@*/", "https://medium.com/"],
  run_at: "document_end", 
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = cssText
  return style
}

export const getInlineAnchor: PlasmoGetInlineAnchor = () =>
  document.querySelector(`#root > div > div.l.c > div:nth-child(2) > footer > div > div > div > div > div.ab.q.jh`)

export const getShadowHostId = () => "footer-superclaps";

export const handleClap = (range: "mid" | "high") => {
  console.log(`Clapped ${range} for an article`);
}

const HeaderSuperClaps = () => {
  
  return (
    <div className="container footerContainer" id="footer-superclaps">
      <button 
        onClick={() => handleClap("mid")}
      >Clap 25</button>
      <button
        onClick={() => handleClap("high")}
      >Clap 50</button>
    </div>
  )
}

export default HeaderSuperClaps