import React from 'react';
import '../Footer.css';

function Footer() {
  return (
    <footer data-testid="footer" className="footer-bar">
      <button type="button" data-testid="drinks-bottom-btn">
        <img src="../images/drinkIcon.svg" alt="drink icon" />
      </button>
      <button type="button" data-testid="explore-bottom-btn">
        <img src="../images/exploreIcon.svg" alt="explore icon" />
      </button>
      <button type="button" data-testid="food-bottom-btn">
        <img src="../images/mealtIcon.svg" alt="mealt icon" />
      </button>
    </footer>
  );
}

export default Footer;
