import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import '../Profile.css';

function Profile() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  async function getUserEmail() {
    const userEmail = await JSON.parse(localStorage.getItem('user')).email;
    setEmail(userEmail);
  }

  useEffect(() => {
    getUserEmail();
  }, []);

  const handleClick = (path) => {
    if (path === '/') {
      localStorage.clear();
      history.push(path);
    }
    history.push(path);
  };

  return (
    <div>
      <div className="header-content">
        <Header name="Profile" />
      </div>
      <div className="profile-container">
        <p data-testid="profile-email" className="profile-email">
          {email}
        </p>
        <button
          type="button"
          data-testid="profile-done-btn"
          onClick={ () => handleClick('/done-recipes') }
          className="profile-button profile-btn-done"
        >
          Done Recipes
        </button>
        <button
          type="button"
          data-testid="profile-favorite-btn"
          onClick={ () => handleClick('/favorite-recipes') }
          className="profile-button profile-btn-fav"
        >
          Favorite Recipes
        </button>
        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ () => handleClick('/') }
          className="profile-button profile-btn-logout"
        >
          Logout
        </button>

      </div>
      <Footer />
    </div>
  );
}

export default Profile;
