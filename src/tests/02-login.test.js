import React from 'react';
import { screen, render } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import userEvent from '@testing-library/user-event';

import App from '../App';

describe('Teste para a tela de login', () => {
  test('Testes para o input de email', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/');

    const emailInput = screen.getByTestId('email-input');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveValue('');
    userEvent.type(emailInput, 'teste@gmail.com');
    expect(emailInput).toHaveValue('teste@gmail.com');
  });

  test('Testes para o input de password', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/');

    const passwordInput = screen.getByTestId('password-input');
    expect(passwordInput).toBeInTheDocument();
    expect(passwordInput).toHaveValue('');
    userEvent.type(passwordInput, '1234567');
    expect(passwordInput).toHaveValue('1234567');
  });

  test('Testes para o botão de login', () => {
    const history = createMemoryHistory();
    render(
      <Router history={ history }>
        <App />
      </Router>,
    );
    history.push('/');

    const loginButton = screen.getByTestId('login-submit-btn');
    expect(loginButton).toBeInTheDocument();
    const passwordInput = screen.getByTestId('password-input');
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'myemail@gmail.com');
    userEvent.type(passwordInput, '1234567');
    userEvent.click(loginButton);
    expect(history.entries[1].pathname).toBe('/foods');
  });
});
