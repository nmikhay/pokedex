import React from "react";
import styles from "./Loader.module.css";
import pokeballImage from "../../img/pokeballloader.png";

function Loader() {
  return (
    <div className={styles.loaderContainer}>
      <img className={styles.loaderImage} src={pokeballImage} alt="Loading" />
    </div>
  );
}

export default Loader;