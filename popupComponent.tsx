import { useEffect, useState } from "react";
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

  const [midState, setMidState] = useState(storedClaps.mid);
  const [highState, setHighState] = useState(storedClaps.high);

  const handleSave = () => {
    savedClaps = {
      mid: midState,
      high: highState,
    }

    setStoredClaps(savedClaps);
  } 

  const manageNumInput = (ev: React.ChangeEvent<HTMLInputElement>, kind: "mid" | "high") => {
    if (ev.target.value == "") {
      return
    }
    if (kind == "mid") {
      if (parseInt(ev.target.value) > parseInt(highState)) {
        return
      }
      setMidState(ev.target.value);
    }
    else if (kind == "high") {
      if ((parseInt(ev.target.value) < parseInt(midState)) || parseInt(ev.target.value) > 50) {
        return
      }
      setHighState(ev.target.value);
    }
  }

  return (
    <main className={styles.container}>
      <h2>SuperClap👏🏾</h2>

      <section className={styles.setContainer}>
        <div>
          <h3>Mid</h3>
          <input
           type="number" name="midClaps" min="1" max={highState} required
           value={midState} onChange={e => manageNumInput(e, "mid")}
          />
        </div>
        <div>
          <h3>High</h3>
          <input
            type="number" name="highClaps" min={midState} max="50"
            value={highState} onChange={e => manageNumInput(e, "high")}
          />
        </div>
      </section>

      <div>
        ⚡ = {storedClaps.mid}
        <br />
        🔥 = {storedClaps.high}
      </div>

      <button onClick={handleSave}>Save Claps</button>
    </main>
  );
}

export default PopupComponent;