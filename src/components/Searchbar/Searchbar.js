import { useState } from "react";
import PropTypes from "prop-types";
import css from "./Searchbar.module.css";

export default function Searchbar({ onSubmitForm }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    if (value === "") {
      return;
    }
    e.preventDefault();
    onSubmitForm(value);
    setValue("");
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button type="submit" className={css["searchForm-button"]}>
          <span className={css["searchForm-button-label"]}>Search</span>
        </button>

        <input
          value={value}
          onInput={handleChange}
          className={css["searchForm-input"]}
          type="text"
          placeholder="Search images and photos"
        />
      </form>
    </header>
  );
}

Searchbar.propTypes = {
  onSubmitForm: PropTypes.func.isRequired,
};
