import { useEffect } from "react";
import styles from "./SearchBox.module.css";

function SearchBox({ search, setSearch, searchHandler }) {
  return (
    <div>
      <label htmlFor="">جستجو در مخاطبین</label>
      <input
        type="text"
        placeholder="عنوان سرچ"
        value={search}
        onChange={(event) => searchHandler(event)}
      />
    </div>
  );
}

export default SearchBox;
