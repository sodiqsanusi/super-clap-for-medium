import { useEffect, useState } from "react";
import logoImage from "data-base64:~assets/logo.png";
import * as styles from "./popup.module.css";
import { useStorage } from "@plasmohq/storage/hook";


const PopupComponent =  () => { 
  let savedClaps = {
    mid: "25",
    high: "50",
  }

  const [storedClaps, setStoredClaps] = useStorage("storedClaps", (v) => v === undefined ? savedClaps : v);

  useEffect(() => {
    setMidState(storedClaps.mid);
    setHighState(storedClaps.high);
  }, [storedClaps])

  const [justSaved, setJustSaved] = useState(false);
  const [midState, setMidState] = useState(storedClaps.mid);
  const [highState, setHighState] = useState(storedClaps.high);

  const handleSave = () => {
    savedClaps = {
      mid: midState && midState > 0 ? midState : "25",
      high: highState && highState > 0 ? highState : "50",
    }

    setStoredClaps(savedClaps);
    setJustSaved(true);
    setTimeout(() => {
      setJustSaved(false);
    }, 1500);
  } 

  const manageNumInput = (ev: React.ChangeEvent<HTMLInputElement>, kind: "mid" | "high") => {
    if (parseInt(ev.target.value) > 50 || parseInt(ev.target.value) < 0) {
      return
    }
    if (ev.target.value.length > 2) {
      return;
    }
    if (kind == "mid") {
      setMidState(ev.target.value);
    }
    else if (kind == "high") {
      setHighState(ev.target.value);
    }
  }

  return (
    <main className={styles.container}>
      <header className={styles.headerContainer}>
        <div className={styles.logoHolder}>
          <img src={logoImage} alt="SuperClap's Logo" />
        </div>
        <h2>Settings</h2>
      </header>

      <section className={styles.setContainer}>
        <div className={styles.inputLayout}>
          <span>🔥</span>
          <input
           type="number" name="midClaps" min="1" max="50" required
           value={midState} onChange={e => manageNumInput(e, "mid")}
          />
        </div>
        <div className={styles.inputLayout}>
          <span>⚡</span>
          <input
            type="number" name="highClaps" min="1" max="50"
            value={highState} onChange={e => manageNumInput(e, "high")}
          />
        </div>
      </section>

      <div className={styles.saveSection}>
        {justSaved && <p className={styles.afterSave}>Clap Count Saved</p>}
        <button
          className={styles.saveButton}
          onClick={handleSave}
        >Save Claps</button>
      </div>

      <footer className={styles.popupFooter}>
        <p className={styles.footerText}>
          Built by <a href="https://github.com/sodiqsanusi/" target="_blank">Sodiq "Ade" Sanusi</a>
        </p>
        <p className={styles.footerText}>
          Designed by <a href="https://mideoladele.webflow.io/" target="_blank">Mide</a>
        </p>
      </footer>
    </main>
  );
}

export default PopupComponent;