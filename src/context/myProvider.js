import PropTypes from 'prop-types';
import React, { useState } from 'react';
import MyContext from './myContext';

function MyProvider({ children }) {
  const [searchInput, setsearchInput] = useState('');

  function handleSearch({ target }) {
    setsearchInput(target.value);
  }
  const INITIAL_STATE = {
    handleSearch,
    searchInput,
    setsearchInput,

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
