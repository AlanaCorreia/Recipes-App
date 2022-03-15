import React from 'react';
import '../Explore.css';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Explore() {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };
  return (
    <div className="explore-content">
      <div className="header-content">
        <Header name="Explore" />
      </div>
      <div className="explore-buttons">
        <button
          className="buttons-explore"
          type="button"
          data-testid="explore-foods"
          onClick={ () => handleClick('/explore/foods') }
        >
          Explore Foods
        </button>
        <button
          className="buttons-explore"
          type="button"
          data-testid="explore-drinks"
          onClick={ () => handleClick('/explore/drinks') }
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default Explore;
