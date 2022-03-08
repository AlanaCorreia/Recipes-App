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
});
