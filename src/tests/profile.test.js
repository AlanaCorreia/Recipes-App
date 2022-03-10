import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Profile from '../pages/Profile';

describe('Teste da tela Profile', () => {
  it('82-Tem os data-testids requeridos', () => {
    renderWithRouter(<Profile />);

    const emailDataTestId = screen.getByTestId('profile-email');
    expect(emailDataTestId).toBeInTheDocument();

    const doneBtnDataTestId = screen.getByTestId('profile-done-btn');
    expect(doneBtnDataTestId).toBeInTheDocument();

    const favoriteBtnDataTestId = screen.getByTestId('profile-favorite-btn');
    expect(favoriteBtnDataTestId).toBeInTheDocument();

    const logoutBtnDataTestId = screen.getByTestId('profile-logout-btn');
    expect(logoutBtnDataTestId).toBeInTheDocument();
  });
  // it('83-O e-mail armazenado em localStorage está visível', () => {
  //   renderWithRouter(<Profile />);
  // });
  it('84-Testa se há 3 botões: "Done Recipes", "Favorite Recipes" e "Logout"', () => {
    renderWithRouter(<Profile />);

    const doneBtn = screen.getByRole('button', { name: 'Done Recipes' });
    expect(doneBtn).toBeInTheDocument();

    const favoriteBtn = screen.getByRole('button', { name: 'Favorite Recipes' });
    expect(favoriteBtn).toBeInTheDocument();

    const logoutBtn = screen.getByRole('button', { name: 'Logout' });
    expect(logoutBtn).toBeInTheDocument();
  });
  it('85-Redireciona para tela de receitas favoritas', () => {
    const { history } = renderWithRouter(<Profile />);

    const favoriteBtn = screen.getByRole('button', { name: 'Favorite Recipes' });
    expect(favoriteBtn).toBeInTheDocument();

    userEvent.click(favoriteBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/favorite-recipes');
  });
  it('86-Redireciona para tela de receitas feitas', () => {
    const { history } = renderWithRouter(<Profile />);

    const doneBtn = screen.getByRole('button', { name: 'Done Recipes' });
    expect(doneBtn).toBeInTheDocument();

    userEvent.click(doneBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/done-recipes');
  });
  it('87-O localStorage deve ser limpo e redireciona para tela de login', () => {
    const { history } = renderWithRouter(<Profile />);

    const logoutBtn = screen.getByRole('button', { name: 'Logout' });
    expect(logoutBtn).toBeInTheDocument();

    userEvent.click(logoutBtn);

    const { pathname } = history.location;
    expect(pathname).toBe('/');
  });
});
