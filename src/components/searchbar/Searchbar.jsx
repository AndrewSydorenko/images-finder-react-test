import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from '../searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

class Searchbar extends Component {
  state = {
    searchQuery: '',
  };

  handleSubmit = event => {
    event.preventDefault();
    const { searchQuery } = this.state;
    const { onSubmit } = this.props;
    if (searchQuery.trim() === '') return alert('nothing to search');
    onSubmit(searchQuery);
    this.setState({ searchQuery: '' });
  };

  handleChange = event => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <header className={css.bar}>
        <form className={css.form} onSubmit={this.handleSubmit}>
          <button type="submit" className={css.button}>
            <FaSearch />
          </button>
          <input
            className={css.input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchQuery}
            onChange={this.handleChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
