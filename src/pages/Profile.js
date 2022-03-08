import React from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  console.log(userEmail);
  const history = useHistory();

  const handleClick = (path) => {
    if (path === '/') {
      localStorage.clear();
      history.push(path);
    }
    history.push(path);
  };

  return (
    <div>
      <Header name="Profile" />
      <p data-testid="profile-email">{userEmail}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        onClick={ () => handleClick('/done-recipes') }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        onClick={ () => handleClick('/favorite-recipes') }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        onClick={ () => handleClick('/') }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
