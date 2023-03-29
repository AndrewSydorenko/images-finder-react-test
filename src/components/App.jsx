import { useState, useEffect } from 'react';
import Modal from './modal/Modal';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import { fetchImages } from './servises/images-api';
import Loader from './loader/Loader';

function App() {
  const [hits, setHits] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState('');

  useEffect(() => {
    setIsLoading(true);
    fetchImages(searchQuery, currentPage)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          throw new Error(
            `"Sorry, we couldn't find any hits for your search "${searchQuery}"`
          );
        }
        setHits(prevHits => [...prevHits, ...hits]);
      })
      .catch(error => setError(error.message))
      .finally(() => setIsLoading(false));
  }, [searchQuery, currentPage]);

  const onChangeQuery = query => {
    setSearchQuery(query);
    setCurrentPage(1);
    setHits([]);
    setError(null);
  };

  const handleLoadMore = () => {
    setCurrentPage(prevPage => prevPage + 1);
  };

  const openModal = url => {
    setLargeImageURL(url);
    setShowModal(true);
  };

  const toggleModal = () => {
    setShowModal(prevShowModal => !prevShowModal);
  };

  return (
    <div className="App">
      <Searchbar onSubmit={onChangeQuery} />
      {error && <h2 className="error">{error}</h2>}

      <ImageGallery hits={hits} onImageClick={openModal} />

      {isLoading && <Loader />}

      {hits.length > 0 && !isLoading && <Button onClick={handleLoadMore} />}

      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL}>
          <button type="button" onClick={toggleModal}>
            Close
          </button>
        </Modal>
      )}
    </div>
  );
}

export default App;
