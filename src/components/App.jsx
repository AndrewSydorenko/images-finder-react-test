import { Component } from 'react';
import Modal from './modal/Modal';
import ImageGallery from './imageGallery/ImageGallery';
import Searchbar from './searchbar/Searchbar';
import Button from './button/Button';
import { fetchImages } from './servises/images-api';
import Loader from './loader/Loader';

export class App extends Component {
  state = {
    hits: [],
    currentPage: 1,
    searchQuery: '',
    isLoading: false,
    error: null,
    showModal: false,
    largeImageURL: '',
  };

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.searchQuery !== this.state.searchQuery ||
      prevState.currentPage !== this.state.currentPage
    ) {
      this.fetchImages();
    }
  }

  onChangeQuery = query => {
    this.setState({
      searchQuery: query,
      currentPage: 1,
      hits: [],
      error: null,
    });
  };

  fetchImages = () => {
    const { currentPage, searchQuery } = this.state;

    this.setState({ isLoading: true });
    fetchImages(searchQuery, currentPage)
      .then(({ hits, totalHits }) => {
        if (totalHits === 0) {
          return Promise.reject(
            new Error(
              `Sorry, we couldn't find any hits for your search "${searchQuery}"`
            )
          );
        }

        this.setState(prevState => ({
          hits: [...prevState.hits, ...hits],
        }));
      })
      .catch(error => this.setState({ error: error.message }))
      .finally(() => this.setState({ isLoading: false }));
  };

  toggleModal = () => {
    this.setState(({ showModal }) => ({ showModal: !showModal }));
  };

  handleLoadMore = () => {
    this.setState(prevState => ({ currentPage: prevState.currentPage + 1 }));
  };
  openModal = url => {
    this.setState({ largeImageURL: url });
    this.toggleModal();
  };

  render() {
    const { hits, isLoading, error, showModal, largeImageURL } = this.state;
    return (
      <div className="App">
        <Searchbar onSubmit={this.onChangeQuery} />

        {error && <h2 className="error">{error}</h2>}

        <ImageGallery hits={hits} onImageClick={this.openModal} />

        {isLoading && <Loader />}

        {this.state.hits.length > 0 && !isLoading && (
          <Button onClick={this.handleLoadMore} />
        )}

        {showModal && (
          <Modal onClose={this.toggleModal} largeImageURL={largeImageURL}>
            <button type="button" onClick={this.toggleModal}>
              Close
            </button>
          </Modal>
        )}
      </div>
    );
  }
}
