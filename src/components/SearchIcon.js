import React, { useState } from 'react';
import searchIcon from '../images/searchIcon.svg';

function SearchIcon() {
  const [searchBar, setSearchBar] = useState(false);

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
        /> : null }
      </div>
    </div>
  );
}

export default SearchIcon;
