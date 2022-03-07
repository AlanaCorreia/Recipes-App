import React from 'react';
import '../Footer.css';
import { useHistory } from 'react-router-dom';

function Footer() {
  const history = useHistory();

  handleClick = (path) => {
    history.push(path);
  };

  return (
    <footer data-testid="footer" className="footer-bar">
      <button
        type="button"
        data-testid="drinks-bottom-btn"
        onClick={ handleClick('/drinks') }
      >
        <img src="../images/drinkIcon.svg" alt="drink icon" />
      </button>
      <button
        type="button"
        data-testid="explore-bottom-btn"
        onClick={ handleClick('/explore') }
      >
        <img src="../images/exploreIcon.svg" alt="explore icon" />
      </button>
      <button
        type="button"
        data-testid="food-bottom-btn"
        onClick={ handleClick('/foods') }
      >
        <img src="../images/mealtIcon.svg" alt="mealt icon" />
      </button>
    </footer>
  );
}

export default Footer;
