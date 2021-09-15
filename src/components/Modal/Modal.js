import { useEffect } from "react";
import { createPortal } from "react-dom";
import { disableBodyScroll, enableBodyScroll } from "body-scroll-lock";
import PropTypes from "prop-types";
import css from "./Modal.module.css";

const modalRoot = document.querySelector("#modal-root");

export default function Modal({ largeImg, onCloseModal }) {
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    disableBodyScroll(modalRoot);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      enableBodyScroll(modalRoot);
    };
  });

  const handleKeyDown = (e) => {
    if (e.code === "Escape") {
      onCloseModal();
    }
  };

  const handleClickModal = (e) => {
    if (e.target === e.currentTarget) {
      onCloseModal();
    }
  };

  return createPortal(
    <div className={css.overlay} onClick={handleClickModal}>
      <div className={css.modal}>
        <img src={largeImg} alt="img" />
      </div>
    </div>,
    modalRoot
  );
}

Modal.propTypes = {
  largeImg: PropTypes.string,
  onCloseModal: PropTypes.func,
};
