import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';

function Foods() {
  return (
    <div>
      <div className="header-content">
        <Header name="Foods" />
        <SearchBar name="meals" />
      </div>
      <Footer />
    </div>
  );
}

export default Foods;
