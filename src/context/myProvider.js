import PropTypes from 'prop-types';
import React, { /* useEffect, useState */ } from 'react';
import MyContext from './myContext';

function Provider({ children }) {
  return (
    <MyContext.Provider value={ { /* data */ } }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.string,
}.isRequired;

export default Provider;
