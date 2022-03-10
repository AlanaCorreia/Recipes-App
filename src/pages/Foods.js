import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import SearchIcon from '../components/SearchIcon';

function Foods() {
  return (
    <div>
      <div className="header-content">
        <Header name="Foods" />
        <SearchIcon />
      </div>
      <SearchBar name="meals" />
      <Footer />
    </div>
  );
}

export default Foods;
