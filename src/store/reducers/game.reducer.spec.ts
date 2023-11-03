import { initialGameState, gameReducer, GameState } from './game.reducer';

import * as actions from '../actions/game.actions';

describe('gameReducer', () => {
  it('should handle setting the number of rounds', () => {
    const initialState = {
      ...initialGameState,
      numberOfRounds: null,
    };

    const rounds = 5;

    const action = actions.setNumberOfRounds({ rounds });
    const newState = gameReducer(initialState, action);

    expect(newState.numberOfRounds).toBe(rounds);
  });

  it('should handle starting the game', () => {
    const initialState: GameState = {
      ...initialGameState,
      currentView: 0,
      currentRoundNumber: 0,
    };

    const action = actions.startGame();
    const newState = gameReducer(initialState, action);

    expect(newState.currentView).toBe(1);
    expect(newState.currentRoundNumber).toBe(0);
  });

  it('should handle setting visibility', () => {
    const initialState: GameState = {
      ...initialGameState,
      currentView: 0,
    };

    const visible = 1;

    const action = actions.setVisibility({ visible });
    const newState = gameReducer(initialState, action);

    expect(newState.currentView).toBe(visible);
  });

  it('should handle adding a round', () => {
    const initialState: GameState = {
      ...initialGameState,
      currentRoundNumber: 0,
      numberOfRounds: 3,
      rounds: [],
      results: {
        empire: 0,
        rebellion: 0,
      },
    };

    const action = actions.addRound();
    const newState = gameReducer(initialState, action);

    expect(newState.currentRoundNumber).toBe(1);
    expect(newState.currentRound?.round).toBe(1);
    expect(newState.currentRound?.starts).toBe(1);
  });
});
