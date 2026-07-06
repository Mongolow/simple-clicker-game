# Clicker Game

A desktop clicker game built with Electron, HTML, CSS, and JavaScript.

## Description
The app lets you earn points by clicking and spending them on upgrades.
The game runs as a desktop application through Electron and keeps its UI in the renderer process.

## How the game works
1. Click the `+` button to gain points.
2. Buy `click upgrade` to increase single-click power.
3. Buy `boost click` to get a x10 bonus for 5 clicks.
4. Buy `autoclicker upgrade` to make automatic clicks faster.
5. Use `save` to store current progress in browser localStorage.
6. Use `load` to restore saved progress.
7. Use `restart` to reset the game state.

## Mechanics
- `counter`: current number of points.
- `click power`: strength of one click.
- `boost click`: temporary click bonus.
- `autoclicker`: automatically adds points at a time interval.
- When autoclicker reaches its limit, the cost label changes to `cost: maxed out`.
- `save/load`: stores and restores game state using localStorage key `clicker_game_save`.

## Save System
- Save includes: points, click power, upgrade costs, boost clicks, autoclicker state and interval.
- `save` writes the current state to localStorage.
- `load` reads state from localStorage and restores active autoclicker timer when needed.

## Run Locally
1. Clone the repository.
2. Enter the project directory.
3. Install dependencies:

```bash
npm install
```

4. Start the Electron app:

```bash
npm start
```

## Build
To create a packaged desktop build:

```bash
npm run package
```

To generate platform installers with Electron Forge:

```bash
npm run make
```

## File structure
- `src/index.js` - Electron main process and window creation.
- `src/preload.js` - preload script for the renderer window.
- `src/index.html` - game UI structure.
- `src/index.css` - game styling.
- `src/script.js` - clicker game logic and save/load handling.
- `forge.config.js` - Electron Forge configuration.

## Technologies
- Electron
- Electron Forge
- HTML5
- CSS3
- JavaScript (Vanilla JS)
- Bootstrap 5 (CDN)

## Future improvements
- improve upgrade cost balancing
- add click animations and cleaner UI
- improve mobile layout
- autosave on important actions and on page load
