import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './myContext';

function MyProvider({ children }) {
  const [searchInput, setsearchInput] = useState('');
  const [searchBarShow, setSearchBarShow] = useState(false);
  const [idPage, setIdPage] = useState('');

  function handleSearch({ target }) {
    setsearchInput(target.value);
  }

  const INITIAL_STATE = {
    handleSearch,
    searchInput,
    setsearchInput,
    searchBarShow,
    setSearchBarShow,
    idPage,
    setIdPage,
  };
  return (
    <MyContext.Provider value={ INITIAL_STATE }>
      {children}
    </MyContext.Provider>
  );
}

MyProvider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default MyProvider;
