import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SearchIcon from '../components/SearchIcon';

function Drinks() {
  return (
    <div>
      <Header name="Drinks" />
      <SearchBar name="drinks" />
      <SearchIcon />
      <Footer />
    </div>
  );
}

export default Drinks;
