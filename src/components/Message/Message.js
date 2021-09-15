import PropTypes from "prop-types";
import css from "./Message.module.css";

export default function Message({ error }) {
  return (
    <div className={css.wrap}>
      <h1 className={css.title}>
        {error ? error : "Please, enter the correct name for your search"}
      </h1>
    </div>
  );
}

Message.propTypes = {
  error: PropTypes.string,
};
