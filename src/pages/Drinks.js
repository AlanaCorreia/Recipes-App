import React from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';

function Drinks() {
  return (
    <div>
      <Header name="Drinks" />
      <SearchBar name="drinks" />
      <Footer />
    </div>
  );
}

export default Drinks;
