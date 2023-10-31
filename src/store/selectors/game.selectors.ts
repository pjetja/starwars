import { createFeatureSelector, createSelector } from '@ngrx/store';
import { gameFeatureName } from '../config';
import { GameState, RoundDetails } from '../reducers';

const GameFeatureSelector = createFeatureSelector<GameState>(gameFeatureName);

export const totalNumberOfRoundsSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): number | null => state?.numberOfRounds
);

export const currentRoundSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): number => state?.currentRoundNumber
);

export const currentResultsSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): { empire: number; rebellion: number } => state?.results
);

export const currentRoundDetailsSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): RoundDetails | undefined => state?.currentRound
);

export const currentRoundDeckTypeSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): 1 | 2 | undefined => state?.currentRound?.deckType
);

export const firstPlyaerInRoundSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): 1 | 2 | undefined => state?.currentRound?.starts
);

export const playerSelectedCardSelector = (player: 1 | 2) =>
  createSelector(GameFeatureSelector, (state: GameState): boolean => {
    if (player === 1) {
      return state.currentRound?.empire?.cardIndex !== undefined;
    } else {
      return state.currentRound?.rebellion?.cardIndex !== undefined;
    }
  });

export const isVisibleForPlayerSelector = (player: 1 | 2) =>
  createSelector(GameFeatureSelector, (state: GameState): boolean => {
    return state?.currentView === player;
  });

export const isVisibleForAllSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): boolean => {
    return (
      state?.currentView === 0 &&
      state.currentRound?.empire?.cardIndex !== undefined &&
      state.currentRound?.rebellion?.cardIndex !== undefined
    );
  }
);

export const winnerSelector = createSelector(
  GameFeatureSelector,
  (state: GameState): number | undefined => state?.winner
);
