import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { MIN_PASSWORD_VALUE } from '../services/consts';
import '../Login.css';

function Login() {
  const [stateEmail, setStateEmail] = useState('');
  const [statePassword, setStatePassword] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isRedirect, setIsRedirect] = useState(false);

  // FONTE: funcao para  validar email link: https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };

  const validadeButton = () => {
    if (statePassword.length > MIN_PASSWORD_VALUE && validateEmail(stateEmail)) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  function handleChange({ target }, setState) {
    setState(target.value);
  }

  useEffect(() => {
    validadeButton();
  }, [stateEmail, statePassword]);

  function clickButton() {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email: stateEmail }));
    setIsRedirect(true);
  }

  return (
    <div className="login-container">
      <h1 className="title-header">Login</h1>
      <form className="login-form-container">
        <input
          type="email"
          data-testid="email-input"
          placeholder="Email"
          value={ stateEmail }
          onChange={ (event) => handleChange(event, setStateEmail) }
          className="login-input-form"
        />
        <input
          type="password"
          data-testid="password-input"
          placeholder="Password"
          value={ statePassword }
          onChange={ (event) => handleChange(event, setStatePassword) }
          className="login-input-form"
        />
        <button
          type="button"
          disabled={ isDisabled }
          data-testid="login-submit-btn"
          onClick={ clickButton }
          className="login-btn-entrar"
        >
          Enter
        </button>
      </form>
      {isRedirect && <Redirect to="/foods" />}
    </div>
  );
}

export default Login;
