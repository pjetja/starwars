import { createAction, props } from '@ngrx/store';
import { deckFeatureName } from '../config';
import { Card, HeroCard, SpaceshipCard } from '../reducers';

export const drawHeroCard = createAction(
  `[${deckFeatureName}] Draw Hero Card`,
  props<{ player: 'empire' | 'rebellion' }>()
);
export const drawSpaceshipCard = createAction(
  `[${deckFeatureName}] Draw Spaceship Card`,
  props<{ player: 'empire' | 'rebellion' }>()
);

export const setHeroesDeck = createAction(
  `[${deckFeatureName}] Set Heroes Deck`,
  props<{ heroesDeck: Card[] }>()
);

export const setSpaceshipDeck = createAction(
  `[${deckFeatureName}] Set Spaceship Deck`,
  props<{ spaceshipDeck: Card[] }>()
);
export const setHeroCard = createAction(
  `[${deckFeatureName}] Set Hero Card`,
  props<{ heroCard: HeroCard }>()
);

export const setSpaceshipCard = createAction(
  `[${deckFeatureName}] Set Spaceship Card`,
  props<{ spaceshipCard: SpaceshipCard }>()
);

export const showHeroCardDetails = createAction(
  `[${deckFeatureName}] Show Hero Card Details`,
  props<{ uid: number; player: 1 | 2 }>()
);

export const showSpaceshipCardDetails = createAction(
  `[${deckFeatureName}] Show Spaceship Card Details`,
  props<{ uid: number; player: 1 | 2 }>()
);

export const removeUsedCards = createAction(
  `[${deckFeatureName}] Remove Used Cards`
);

export const fetchHeroesDeck = createAction(
  `[${deckFeatureName}] Fetch Hero Deck`
);
export const fetchHeroesDeckSuccess = createAction(
  `[${deckFeatureName}] Fetch Hero Deck Success`
);
export const fetchHeroesDeckFailure = createAction(
  `[${deckFeatureName}] Fetch Hero Deck Failure`
);

export const fetchSpaceshipDeck = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck`
);
export const fetchSpaceshipDeckSuccess = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck Success`
);
export const fetchSpaceshipDeckFailure = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck Failure`
);

export const fetchHeroesCard = createAction(
  `[${deckFeatureName}] Fetch Hero Card`,
  props<{ uid: number; player: 1 | 2 }>()
);
export const fetchHeroesCardSuccess = createAction(
  `[${deckFeatureName}] Fetch Hero Card Success`
);
export const fetchHeroesCardFailure = createAction(
  `[${deckFeatureName}] Fetch Hero Card Failure`
);

export const fetchSpaceshipCard = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card`,
  props<{ uid: number; player: 1 | 2 }>()
);
export const fetchSpaceshipCardSuccess = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card Success`
);
export const fetchSpaceshipCardFailure = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card Failure`
);
