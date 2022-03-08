import React from 'react';
import Footer from '../components/Footer';

function Profile() {
  const userEmail = JSON.parse(localStorage.getItem('user')).email;
  console.log(userEmail);
  return (
    <div>
      <p data-testid="profile-email">{userEmail}</p>
      <button
        type="button"
        data-testid="profile-done-btn"
        // onClick={ handleClick }
      >
        Done Recipes
      </button>
      <button
        type="button"
        data-testid="profile-favorite-btn"
        // onClick={ handleClick }
      >
        Favorite Recipes
      </button>
      <button
        type="button"
        data-testid="profile-logout-btn"
        // onClick={ handleClick }
      >
        Logout
      </button>
      <Footer />
    </div>
  );
}

export default Profile;
