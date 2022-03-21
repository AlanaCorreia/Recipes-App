import React from 'react';
import '../Footer.css';
import { useHistory } from 'react-router-dom';
import drinkIcon from '../images/drinkIcon.svg';
import explore from '../images/exploreIcon.svg';
import mealtIcon from '../images/mealIcon.svg';

function Footer() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <footer data-testid="footer" className="footer-bar">
      <button
        className="button-background"
        type="button"
        onClick={ () => handleClick('/drinks') }
      >
        <img
          data-testid="drinks-bottom-btn"
          src={ drinkIcon }
          alt="drink icon"
          className="img-icons"
        />
      </button>
      <button
        className="button-background"
        type="button"
        onClick={ () => handleClick('/explore') }
      >
        <img
          data-testid="explore-bottom-btn"
          src={ explore }
          alt="explore icon"
          className="img-icons"
        />
      </button>
      <button
        className="button-background"
        type="button"
        onClick={ () => handleClick('/foods') }
      >
        <img
          className="btn-food"
          data-testid="food-bottom-btn"
          src={ mealtIcon }
          alt="mealt icon"
        />
      </button>
    </footer>
  );
}

export default Footer;
