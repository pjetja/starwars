import { createAction, props } from '@ngrx/store';
import { gameFeatureName } from '../config';

export const setNumberOfRounds = createAction(
  `[${gameFeatureName}] Set Number Of Rounds`,
  props<{ rounds: number }>()
);

export const startGame = createAction(`[${gameFeatureName}] Start Game`);

export const setVisibility = createAction(
  `[${gameFeatureName}] Set Visibility`,
  props<{ visible: 0 | 1 | 2 }>()
);

export const addRound = createAction(`[${gameFeatureName}] Add Round`);

export const selectRoundDeck = createAction(
  `[${gameFeatureName}] Select Round Deck`,
  props<{ deck: 1 | 2 }>()
);

export const playCard = createAction(
  `[${gameFeatureName}] Play Card`,
  props<{ card: number; deck: 1 | 2; player: 1 | 2; value: number | string }>()
);

export const nextPlayer = createAction(`[${gameFeatureName}] Next Player`);

export const finishRound = createAction(`[${gameFeatureName}] Finish Round`);
