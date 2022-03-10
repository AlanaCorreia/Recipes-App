import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchIcon from '../components/SearchIcon';

function Drinks() {
  return (
    <div>
      <div className="header-content">
        <Header name="Drinks" />
        <SearchIcon />
      </div>
      <Footer />
    </div>
  );
}

export default Drinks;
