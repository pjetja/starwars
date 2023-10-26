import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/game.actions';

export interface SelectedCard {
  cardIndex: number;
  // 1 - heros, 2 - spaceships
  cardDeck: 1 | 2;
}

export interface RoundDetails {
  round: number;
  starts: 1 | 2;
  winner?: 1 | 2 | 0;
  empire?: SelectedCard;
  rebellion?: SelectedCard;
}

export interface GameState {
  numberOfRounds: number | null;
  // 0 - all players, 1 - player 1, 2 - player 2
  currentView: 0 | 1 | 2;
  currentPlayer: 1 | 2;
  results: {
    empire: number;
    rebellion: number;
  };
  currentRound?: RoundDetails;
  currentRoundNumber: number;
  rounds?: RoundDetails[];
}

export const initialGameState: GameState = {
  numberOfRounds: null,
  currentView: 0,
  currentPlayer: 1,
  currentRoundNumber: 0,
  results: {
    empire: 0,
    rebellion: 0,
  },
};

export function gameReducer(state: GameState, action: Action) {
  return createReducer(
    initialGameState,
    on(actions.setNumberOfRounds, onSetNumberOfRounds),
    on(actions.startGame, onStartGame)
  )(state, action);
}

function onSetNumberOfRounds(state: GameState, { rounds }: { rounds: number }) {
  return {
    ...state,
    numberOfRounds: rounds,
  };
}

function onStartGame(state: GameState): GameState {
  return {
    ...state,
    currentView: 1,
    currentRoundNumber: 1,
  };
}
