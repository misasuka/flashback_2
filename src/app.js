import { TimelineGame } from './game.js';
import { GameUI } from './ui.js';

const game = new TimelineGame();

const ui = new GameUI({
  onInsert: (index) => {
    const state = game.placeCurrent(index);
    ui.render(state);
  },
  onRestart: () => {
    game.reset();
    ui.render(game.getState());
  }
});

ui.render(game.getState());
