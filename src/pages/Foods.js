import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchIcon from '../components/SearchIcon';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <div>
      <div className="header-content">
        <Header name="Foods" />
        <SearchBar name="Foods" />
        <SearchIcon />
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
