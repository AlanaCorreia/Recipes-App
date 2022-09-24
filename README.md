# Projeto App de Receitas! 🍝🍸

## Contexto do projeto

Este projeto foi desenvolvido por uma equipe de 4 pessoas como TCC do módulo de Front-end na Trybe, seu objetivo era desenvolver um aplicativo de receitas de comidas e bebidas, no qual a pessoa que o estiver utilizando possa buscar por uma receita, com a possibilidade de aplicação de filtros baseados em diferentes critérios como: nome, ingredientes ou categoria. Selecionada a receita, é possível favoritá-la, acompanhar o processo de sua preparação e, após finalizada, marcá-la como feita.

O projeto foi montando com um layout mobile only 📱, com foco nos dispositivos móveis, tendo como base de dados duas APIs distintas, uma para receitas de comida e outra para bebibas, com isso as telas sofrem variações dependendo do tipo da receita (se é comida ou bebida, no caso), utilizando também o localStorage para armazenamento de dados, para que as  informações não se percam caso a pessoa atualize a página, e iniciar o context.

<details>
  <summary>
    <strong>👨‍💻 O que deverá ser desenvolvido:</strong>
  </summary>

  ## Rotas utilizadas na aplicação:

    - Tela de Login: \;
    - Tela principal de receitas de comidas: /foods;
    - Tela principal de receitas de bebidas: /drinks;
    - Tela de detalhes de uma receita de comida: /foods/{id-da-receita};
    - Tela de detalhes de uma receita de bebida: /drinks/{id-da-receita};
    - Tela de receita em progresso de comida: /foods/{id-da-receita}/in-progress;
    - Tela de receita em progresso de bebida: /drinks/{id-da-receita}/in-progress;
    - Tela de explorar: /explore;
    - Tela de explorar comidas: /explore/foods;
    - Tela de explorar bebidas: /explore/drinks;
    - Tela de explorar comidas por ingrediente: /explore/foods/ingredients;
    - Tela de explorar bebidas por ingrediente: /explore/drinks/ingredients;
    - Tela de explorar comidas por nacionalidade: /explore/foods/nationalities;
    - Tela de perfil: /profile;
    - Tela de receitas feitas: /done-recipes;
    - Tela de receitas favoritas: /favorite-recipes.
 
</details>

<details>
  <summary>
    <strong>🔧 Construído com:</strong>
  </summary>
  
  ### API's utilizadas na aplicação:
      - https://www.themealdb.com/
      - https://www.thecocktaildb.com/api.php

  ### Tecnologias:
  
      * React;
      * Fetch API;
      * Context API;
      * JavaScript;
      * CSS;
      * Jest;
      * React Testing Library;

</details>

<details>
  <summary>
    <strong>:bicyclist: Começando:</strong>
  </summary>

  ### :hammer_and_wrench: Instalação
  1- Clone o projeto em sua máquina rodando o seguinte comando no terminal:

  ``` git clone git@github.com:AlanaCorreia/Recipes-App.git ```

  2- Depois de clonado, entre no diretório:

  ``` cd project-recipes-app ```

  3- Instale as dependências
    Para isso, use o seguinte comando: ``` npm install ```

  4- Para inicializar a aplicação
     Use o seguinte comando: ``` npm start ```

  Para acessar a aplicação e testa-la manualmente, acesse a pagina http://localhost:3000/login .

</details>

