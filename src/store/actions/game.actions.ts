import { createAction, props } from '@ngrx/store';
import { gameFeatureName } from '../config';

export const setNumberOfRounds = createAction(
  `[${gameFeatureName}] Set Number Of Rounds`,
  props<{ rounds: number }>()
);

export const startGame = createAction(`[${gameFeatureName}] Start Game`);
