import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Explore from '../pages/Explore';
import {
  EXPLORE_FOODS_DATA_TESTID, EXPLORE_DRINKS_DATA_TESTID } from '../services/consts';

describe('Teste da page Explore', () => {
  it('67-Tem os data-testids requeridos', () => {
    renderWithRouter(<Explore />);
    const exploreFoods = screen.getByTestId(EXPLORE_FOODS_DATA_TESTID);
    expect(exploreFoods).toBeInTheDocument();

    const exploreDrinks = screen.getByTestId(EXPLORE_DRINKS_DATA_TESTID);
    expect(exploreDrinks).toBeInTheDocument();
  });

  it('68-verifica o nome dos botões', () => {
    renderWithRouter(<Explore />);
    const exploreFoodsBtn = screen.getByRole('button', { name: /Explore Foods/i });
    expect(exploreFoodsBtn).toBeDefined();

    const exploreDrinksBtn = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(exploreDrinksBtn).toBeDefined();
  });

  it('69-Botão explore food redireciona para a pagina correta', () => {
    const { history } = renderWithRouter(<Explore />);

    const exploreFoods = screen.getByTestId(EXPLORE_FOODS_DATA_TESTID);
    expect(exploreFoods).toBeInTheDocument();

    userEvent.click(exploreFoods);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore/foods');
  });

  it('69-Botão explore drink redireciona para a pagina correta', () => {
    const { history } = renderWithRouter(<Explore />);

    const exploreDrinks = screen.getByTestId(EXPLORE_DRINKS_DATA_TESTID);
    expect(exploreDrinks).toBeInTheDocument();

    userEvent.click(exploreDrinks);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore/drinks');
  });
});
