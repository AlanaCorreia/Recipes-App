import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from '../helpers/renderWithRouter';
import Foods from '../pages/Foods';
import Login from '../pages/Login';
import Explore from '../pages/Explore';

describe('Teste do component Footer', () => {
  it('19-Tem os data-testids requeridos', () => {
    renderWithRouter(<Foods />);
    const footerDataTestId = screen.getByTestId('footer');
    expect(footerDataTestId).toBeInTheDocument();

    const drinkBtnDataTestId = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtnDataTestId).toBeInTheDocument();

    const exploreBtnDataTestId = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtnDataTestId).toBeInTheDocument();

    const foodBtnDataTestId = screen.getByTestId('food-bottom-btn');
    expect(foodBtnDataTestId).toBeInTheDocument();
  });
  it('20-O Footer deve ficar fixado sempre ao final da página', () => {
    renderWithRouter(<Foods />);
    const footerDataTestId = screen.getByTestId('footer');
    expect(footerDataTestId).toHaveStyle('position: fixed');
    expect(footerDataTestId).toHaveStyle('bottom: 0');
  });
  it('20-Apresenta os ícones corretos', () => {
    renderWithRouter(<Foods />);
    const drinkBtnDataTestId = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtnDataTestId).toHaveAttribute('src', '../images/drinkIcon.svg');

    const exploreBtnDataTestId = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtnDataTestId).toHaveAttribute('src', '../images/exploreIcon.svg');

    const foodBtnDataTestId = screen.getByTestId('food-bottom-btn');
    expect(foodBtnDataTestId).toHaveAttribute('src', '../images/mealIcon.svg');
  });
});

// describe('21-Deve ter footer apenas nas telas principal, de explorar e de perfil', () => {
//   const haveFooter = () => {
//     const footerDataTestId = screen.getByTestId('footer');
//     expect(footerDataTestId).toBeInTheDocument();

//     const drinkBtnDataTestId = screen.getByTestId('drinks-bottom-btn');
//     expect(drinkBtnDataTestId).toBeInTheDocument();

//     const exploreBtnDataTestId = screen.getByTestId('explore-bottom-btn');
//     expect(exploreBtnDataTestId).toBeInTheDocument();

//     const foodBtnDataTestId = screen.getByTestId('food-bottom-btn');
//     expect(foodBtnDataTestId).toBeInTheDocument();
//   };

//   const notHaveFooter = () => {
//     const footerDataTestId = screen.getByTestId('footer');
//     expect(footerDataTestId).not.toBeInTheDocument();

//     const drinkBtnDataTestId = screen.getByTestId('drinks-bottom-btn');
//     expect(drinkBtnDataTestId).not.toBeInTheDocument();

//     const exploreBtnDataTestId = screen.getByTestId('explore-bottom-btn');
//     expect(exploreBtnDataTestId).not.toBeInTheDocument();

//     const foodBtnDataTestId = screen.getByTestId('food-bottom-btn');
//     expect(foodBtnDataTestId).not.toBeInTheDocument();
//   };

//   it('Tela de login não deve ter footer ', () => {
//     renderWithRouter(<Login />);
//     expect(notHaveFooter).toBeTruthy();
//   });
// });

describe('Redirecione a pessoa usuária para tela correta', () => {
  it('22-Redireciona para lista de cocktails ao clicar no ícone de bebidas', () => {
    renderWithRouter(<Foods />);

    const drinkBtnDataTestId = screen.getByTestId('drinks-bottom-btn');
    expect(drinkBtnDataTestId).toBeInTheDocument();

    userEvent.click(drinkBtnDataTestId);

    const titleDrink = screen.getByRole('heading', { name: 'drinkTest' });
    expect(titleDrink).toBeInTheDocument();
  });
  it('23-Redireciona para tela de explorar ao clicar no ícone de exploração', () => {
    renderWithRouter(<Explore />);

    const exploreBtnDataTestId = screen.getByTestId('explore-bottom-btn');
    expect(exploreBtnDataTestId).toBeInTheDocument();

    userEvent.click(exploreBtnDataTestId);

    const titleExplorer = screen.getByRole('heading', { name: 'explorerTest' });
    expect(titleExplorer).toBeInTheDocument();
  });
  it('24-Redireciona para lista de comidas ao clicar no ícone de comidas', () => {
    renderWithRouter(<Foods />);

    const foodBtnDataTestId = screen.getByTestId('food-bottom-btn');
    expect(foodBtnDataTestId).toBeInTheDocument();

    userEvent.click(foodBtnDataTestId);

    const titleFoods = screen.getByRole('heading', { name: 'foodTest' });
    expect(titleFoods).toBeInTheDocument();
  });
});
