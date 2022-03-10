import React, { useContext } from 'react';
import MyContext from '../context/myContext';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  const { searchBarShow, setSearchBarShow } = useContext(MyContext);

  return (
    <button
      type="button"
      onClick={ () => setSearchBarShow(!searchBarShow) }
    >
      <img
        src={ searchIcon }
        data-testid="search-top-btn"
        alt="search"
        className="img-icons"
      />
    </button>
  );
}

export default SearchIcon;
