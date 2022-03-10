import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchIcon from '../components/SearchIcon';

function Drinks() {
  return (
    <div>
      <div className="header-content">
        <Header name="Drinks" />
        <SearchIcon />
      </div>
      <SearchBar name="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
