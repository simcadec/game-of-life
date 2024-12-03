# Conway's Game of Life

Conway's Game of Life is a cellular automaton devised by the British
mathematician John Horton Conway in 1970.

It's a zero-player game, meaning its evolution is determined by its initial state,
requiring no further input.

## Technical introduction

This projet is a TypeScript implementation of the Conway's Game of Life. It uses React for the user interface and the Canvas API for the game rendering.

- UI library: [Ark-UI](https://ark-ui.com/) & [Park-UI](https://park-ui.com/)
- Style system: [Panda CSS](https://panda-css.com/)
- Icons: [Lucide](https://lucide.dev/)
- Package manager: [PNPM](https://pnpm.io/)
- Bundling: [Vite](https://vitejs.dev/)
- Testing: [Vitest](https://vitest.dev/)

## Prerequisites

- Node.JS >=18
- PNPM >=9

## Run the game

1. Git clone the repository:

    ```sh
    git clone https://github.com/simcadec/game-of-life.git
    cd game-of-life
    ```

2. Install dependencies:

    ```sh
    pnpm install
    ```

3. Build and run:

    ```sh
    pnpm run build
    pnpm run preview
    ```

Open <http://localhost:4173> to view the game.

## Development

To run the development server:

```sh
pnpm run dev
```

Open <http://localhost:5173> to view the game in development mode.

Tests can be run with:

```sh
pnpm run test
```
