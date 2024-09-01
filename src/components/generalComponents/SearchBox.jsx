import { useEffect } from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, searchHandler }) {
  return (
    <div className={styles.container}>
      <label htmlFor="search">جستجو در مخاطبین</label>
      <input
      id="search"
        type="text"
        placeholder="عنوان سرچ"
        value={search}
        onChange={(event) => searchHandler(event)}
      />
    </div>
  );
}

export default SearchBox;
