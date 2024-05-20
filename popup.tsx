import { useState } from "react";
import * as styles from "./popup.module.css";

function IndexPopup() {
  const [data, setData] = useState({
    mid: 25,
    high: 50,
  });
  const handleClick = () => {
    console.log("50 times chosen!");
  }

  return (
    <main className={styles.container}>
      <h2>This is SuperClap</h2>

      <div className={styles.buttonCover}>
        <button className={styles.clapButton}>
          Clap 50 times!
        </button>
      </div>
    </main>
  )
}

export default IndexPopup
