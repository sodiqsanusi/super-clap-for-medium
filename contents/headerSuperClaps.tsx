import cssText from "data-text:~/contents/superClaps.css";
import type { PlasmoCSConfig, PlasmoGetInlineAnchor} from "plasmo"
 
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
  document.querySelector(`div.ab.co.ib.ic.id.ie.if.ig.ih.ii.ij.ik.il.im.in.io.ip.iq`)

export const getShadowHostId = () => "header-superclaps";

const handleClap = (range: "mid" | "high") => {
  console.log(`Clapped ${range} for an article`);
}

const HeaderSuperClaps = () => {
  
  return (
    <div className="container">
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