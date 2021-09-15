import PropTypes from "prop-types";
import css from "./ImageGalleryItem.module.css";

export default function ImageGalerryItem({
  webformatURL,
  onSelectImg,
  largeImageURL,
}) {
  return (
    <li
      className={css.imageGalleryItem}
      onClick={() => onSelectImg(largeImageURL)}
    >
      <img
        src={webformatURL}
        alt=""
        className={css["imageGalleryItem-image"]}
      />
    </li>
  );
}

ImageGalerryItem.propTypes = {
  largeImageURL: PropTypes.string,
  webformatURL: PropTypes.string,
  onSelectImg: PropTypes.func,
};
