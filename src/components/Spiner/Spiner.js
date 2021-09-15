import Loader from "react-loader-spinner";
import css from "./Spiner.module.css";

export default function Spiner() {
  return (
    <div className={css.wrap}>
      <Loader
        type="Puff"
        color="#00BFFF"
        height={100}
        width={100}
        timeout={3000} //3 secs
      />
    </div>
  );
}
