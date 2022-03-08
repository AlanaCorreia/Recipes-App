import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/Foods';
import Drinks from '../pages/Drinks';
import Login from '../pages/Login';
import FoodsById from '../pages/FoodsById';
import DrinksById from '../pages/DrinksById';
import FoodsByIdInProgress from '../pages/FoodsByIdInProgress';
import DrinksByIdInProgress from '../pages/DrinksByIdInProgress';
import Explore from '../pages/Explore';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';
import Profile from '../pages/Profile';
import DoneRecipes from '../pages/DoneRecipes';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import { FOOD_BTN_DATA_TESTID, FOOTER_DATA_TESTID,
  DRINK_BTN_DATA_TESTID, EXPLORE_BTN_DATA_TESTID } from '../services/consts';

describe('Teste do component Footer', () => {
  it('19-Tem os data-testids requeridos', () => {
    renderWithRouter(<Foods />);
    const footerDataTestId = screen.getByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();

    const drinkBtnDataTestId = screen.getByTestId(DRINK_BTN_DATA_TESTID);
    expect(drinkBtnDataTestId).toBeInTheDocument();

    const exploreBtnDataTestId = screen.getByTestId(EXPLORE_BTN_DATA_TESTID);
    expect(exploreBtnDataTestId).toBeInTheDocument();

    const foodBtnDataTestId = screen.getByTestId(FOOD_BTN_DATA_TESTID);
    expect(foodBtnDataTestId).toBeInTheDocument();
  });
  it('20-O Footer deve ficar fixado sempre ao final da página', () => {
    renderWithRouter(<Foods />);
    const footerDataTestId = screen.getByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toHaveClass('footer-bar');
  });
  it('20-Apresenta os ícones corretos', () => {
    renderWithRouter(<Foods />);
    const drinkBtnDataTestId = screen.getByTestId(DRINK_BTN_DATA_TESTID);
    expect(drinkBtnDataTestId).toHaveAttribute('src', 'drinkIcon.svg');

    const exploreBtnDataTestId = screen.getByTestId(EXPLORE_BTN_DATA_TESTID);
    expect(exploreBtnDataTestId).toHaveAttribute('src', 'exploreIcon.svg');

    const foodBtnDataTestId = screen.getByTestId(FOOD_BTN_DATA_TESTID);
    expect(foodBtnDataTestId).toHaveAttribute('src', 'mealIcon.svg');
  });
});

describe('21-Deve ter footer apenas nas telas principal, de explorar e de perfil', () => {
  it('Tela de login não deve ter footer', () => {
    renderWithRouter(<Login />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Tem footer na tela de principal de receitas de comidas', () => {
    renderWithRouter(<Foods />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de principal de receitas de bebidas', () => {
    renderWithRouter(<Drinks />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Não tem footer na tela de detalhes de uma receita de comida', () => {
    renderWithRouter(<FoodsById />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de detalhes de uma receita de bebida', () => {
    renderWithRouter(<DrinksById />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em progresso de comida', () => {
    renderWithRouter(<FoodsByIdInProgress />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receita em progresso de bebida', () => {
    renderWithRouter(<DrinksByIdInProgress />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Tem footer na tela de explorar', () => {
    renderWithRouter(<Explore />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas', () => {
    renderWithRouter(<ExploreFoods />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas', () => {
    renderWithRouter(<ExploreDrinks />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por ingrediente', () => {
    renderWithRouter(<ExploreFoodsIngredients />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar bebidas por ingrediente', () => {
    renderWithRouter(<ExploreDrinksIngredients />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de explorar comidas por nacionalidade', () => {
    renderWithRouter(<ExploreFoodsNationalities />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Tem footer na tela de perfil', () => {
    renderWithRouter(<Profile />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas feitas', () => {
    renderWithRouter(<DoneRecipes />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
  it('Não tem footer na tela de receitas favoritas', () => {
    renderWithRouter(<FavoriteRecipes />);
    const footerDataTestId = screen.queryByTestId(FOOTER_DATA_TESTID);
    expect(footerDataTestId).not.toBeInTheDocument();
  });
});

describe('Redirecione a pessoa usuária para tela correta', () => {
  it('22-Redireciona para lista de cocktails ao clicar no ícone de bebidas', () => {
    const { history } = renderWithRouter(<Foods />);

    const drinkBtnDataTestId = screen.getByTestId(DRINK_BTN_DATA_TESTID);
    expect(drinkBtnDataTestId).toBeInTheDocument();

    userEvent.click(drinkBtnDataTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/drinks');
  });
  it('23-Redireciona para tela de explorar ao clicar no ícone de exploração', () => {
    const { history } = renderWithRouter(<Foods />);
    const exploreBtnDataTestId = screen.getByTestId(EXPLORE_BTN_DATA_TESTID);
    expect(exploreBtnDataTestId).toBeInTheDocument();

    userEvent.click(exploreBtnDataTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/explore');
  });
  it('24-Redireciona para lista de comidas ao clicar no ícone de comidas', () => {
    const { history } = renderWithRouter(<Drinks />);

    const foodBtnDataTestId = screen.getByTestId(FOOD_BTN_DATA_TESTID);
    expect(foodBtnDataTestId).toBeInTheDocument();

    userEvent.click(foodBtnDataTestId);

    const { pathname } = history.location;
    expect(pathname).toBe('/foods');
  });
});
