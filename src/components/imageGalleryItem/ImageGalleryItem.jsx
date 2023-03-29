import css from '../imageGalleryItem/ImageGalleryItem.module.css';
import PropTypes from 'prop-types';

export default function ImageGalleryItem({ webformatURL, onImageClick }) {
  return (
    <li className={css.ImageGalleryItem} onClick={onImageClick}>
      <img src={webformatURL} alt="" className={css.ImageGalleryItemImage} />
    </li>
  );
}

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  onImageClick: PropTypes.func.isRequired,
};
