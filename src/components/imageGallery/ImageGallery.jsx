import ImageGalleryItem from 'components/imageGalleryItem/ImageGalleryItem';
import css from '../imageGallery/ImageGallery.module.css';
import PropTypes from 'prop-types';

export default function ImageGallery({ hits, onImageClick }) {
  return (
    <ul className={css.ImageGallery}>
      {hits.map(image => (
        <ImageGalleryItem
          key={image.id}
          webformatURL={image.webformatURL}
          largeImageURL={image.largeImageURL}
          onImageClick={() => onImageClick(image.largeImageURL)}
        />
      ))}
    </ul>
  );
}

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      webformatURL: PropTypes.string.isRequired,
      largeImageURL: PropTypes.string.isRequired,
    })
  ).isRequired,
  onImageClick: PropTypes.func.isRequired,
};
