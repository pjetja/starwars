import { createFeatureSelector, createSelector } from '@ngrx/store';
import { gameFeatureName } from '../config';
import { GameState } from '../reducers';

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
