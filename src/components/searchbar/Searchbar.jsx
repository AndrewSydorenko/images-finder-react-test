import React, { useState } from 'react';
import PropTypes from 'prop-types';
import css from '../searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';

const Searchbar = ({ onSubmit }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    if (searchQuery.trim() === '') return alert('nothing to search');
    onSubmit(searchQuery);
    setSearchQuery('');
  };

  const handleChange = event => {
    setSearchQuery(event.target.value);
  };

  return (
    <header className={css.bar}>
      <form className={css.form} onSubmit={handleSubmit}>
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
          onChange={handleChange}
        />
      </form>
    </header>
  );
};

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default Searchbar;
