import PropTypes from "prop-types";
import ImageGalerryItem from "../ImageGalleryItem/ImageGalleryItem";
import css from "./ImageGallery.module.css";

export default function ImageGallery({ images, onSelectedImg }) {
  return (
    <ul className={css.imageGallery}>
      {images.map((img) => {
        return (
          <ImageGalerryItem
            key={img.largeImageURL}
            largeImageURL={img.largeImageURL}
            webformatURL={img.webformatURL}
            onSelectImg={onSelectedImg}
          />
        );
      })}
    </ul>
  );
}

ImageGallery.propTypes = {
  images: PropTypes.array,
  onSelectedImg: PropTypes.func.isRequired,
};
