import React, { useContext, useState } from 'react';
import MyContext from '../context/myContext';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  const [searchBar, setSearchBar] = useState(false);
  const { searchInput, handleSearch } = useContext(MyContext);

  return (
    <div>
      <button
        type="button"
        onClick={ () => setSearchBar(!searchBar) }
      >
        <img
          src={ searchIcon }
          data-testid="search-top-btn"
          alt="search"
          className="img-icons"
        />
      </button>
      <div>
        { searchBar === true ? <input
          name="search-input"
          label="search-input"
          type="text"
          placeholder="Search ..."
          data-testid="search-input"
          onChange={ handleSearch }
          value={ searchInput }

        /> : null }
      </div>
    </div>
  );
}

export default SearchIcon;
