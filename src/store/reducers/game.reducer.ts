import { Action, createReducer, on } from '@ngrx/store';

import * as actions from '../actions/game.actions';

export interface SelectedCard {
  cardIndex: number;
  // 1 - heros, 2 - spaceships
  cardDeck: 1 | 2;
  cardValue: number | string;
}

export interface RoundDetails {
  round: number;
  starts: 1 | 2;
  winner?: 1 | 2 | 0;
  deckType?: 1 | 2;
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
  winner?: 1 | 2 | 3;
}

export const initialGameState: GameState = {
  numberOfRounds: null,
  rounds: [],
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
    on(actions.startGame, onStartGame),
    on(actions.setVisibility, onSetVisibility),
    on(actions.addRound, onAddRound),
    on(actions.selectRoundDeck, onSelectRoundDeck),
    on(actions.playCard, onPlayCard),
    on(actions.nextPlayer, onNextPlayer),
    on(actions.finishRound, onFinishRound)
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
    currentRoundNumber: 0,
  };
}

function onSetVisibility(
  state: GameState,
  { visible }: { visible: 0 | 1 | 2 }
): GameState {
  return {
    ...state,
    currentView: visible,
  };
}

function onAddRound(state: GameState): GameState {
  let lastRound: RoundDetails | undefined;
  if (state.rounds && state.rounds.length > 1) {
    lastRound = state.rounds[state.rounds.length - 1];
  }

  const roundNumber = state.currentRoundNumber + 1;

  if (roundNumber <= state.numberOfRounds!) {
    const currentRound: RoundDetails = {
      round: roundNumber,
      starts: 1,
    };

    return {
      ...state,
      currentRoundNumber: roundNumber,
      currentRound,
      currentPlayer: 1,
    };
  } else {
    return {
      ...state,
      winner:
        state.results.empire === state.results.rebellion
          ? 3
          : state.results.empire > state.results.rebellion
          ? 1
          : 2,
    };
  }
}

function onSelectRoundDeck(
  state: GameState,
  { deck }: { deck: 1 | 2 }
): GameState {
  if (!state.currentRound) {
    return state;
  }
  return {
    ...state,
    currentRound: {
      ...state.currentRound,
      deckType: deck,
    },
  };
}

function onPlayCard(
  state: GameState,
  {
    card,
    deck,
    player,
    value,
  }: { card: number; deck: 1 | 2; player: 1 | 2; value: number | string }
): GameState {
  if (state.currentRound) {
    if (player === 1) {
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          empire: {
            cardIndex: card,
            cardDeck: deck,
            cardValue: value,
          },
        },
      };
    }
    if (player === 2) {
      return {
        ...state,
        currentRound: {
          ...state.currentRound,
          rebellion: {
            cardIndex: card,
            cardDeck: deck,
            cardValue: value,
          },
        },
      };
    }
  }
  return { ...state };
}

function onNextPlayer(state: GameState): GameState {
  return {
    ...state,
    currentPlayer: opositePlayer(state.currentPlayer),
  };
}

function onFinishRound(state: GameState): GameState {
  if (state.currentRound && state.rounds) {
    const empireCard = state.currentRound?.empire;
    const rebellionCard = state.currentRound?.rebellion;

    let winner: 1 | 2 | 0 = 0;
    if (empireCard && rebellionCard) {
      if (empireCard.cardValue > rebellionCard.cardValue) {
        winner = 1;
      }
      if (empireCard.cardValue < rebellionCard.cardValue) {
        winner = 2;
      }
    }

    const currentRound = {
      ...state.currentRound,
      winner,
    };

    const rounds = state.rounds ? [...state.rounds] : [];

    return {
      ...state,
      rounds: [...rounds, currentRound],
      currentRound: undefined,
      results: {
        ...state.results,
        empire: winner === 1 ? state.results.empire + 1 : state.results.empire,
        rebellion:
          winner === 2 ? state.results.rebellion + 1 : state.results.rebellion,
      },
    };
  }
  return { ...state };
}

function opositePlayer(player: 1 | 2): 1 | 2 {
  return player === 1 ? 2 : 1;
}
