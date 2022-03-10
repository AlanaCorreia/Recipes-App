import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';

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
      <Header name="Profile" />
      <p data-testid="profile-email">
        {email}
      </p>
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
