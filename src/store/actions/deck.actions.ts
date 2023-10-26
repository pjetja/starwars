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

export const playHeroCard = createAction(
  `[${deckFeatureName}] Play Hero Card`,
  props<{ player: 'empire' | 'rebellion'; card: HeroCard }>()
);
export const playSpaceshipCard = createAction(
  `[${deckFeatureName}] Play Spaceship Card`,
  props<{ player: 'empire' | 'rebellion'; card: SpaceshipCard }>()
);

export const fetchHeroesDeck = createAction(
  `[${deckFeatureName}] Fetch Hero Deck`
);
export const fetchHeroesDeckSuccess = createAction(
  `[${deckFeatureName}] Fetch Hero Deck Success`,
  props<{ heroesDeck: Card[] }>()
);
export const fetchHeroesDeckFailure = createAction(
  `[${deckFeatureName}] Fetch Hero Deck Failure`
);

export const fetchSpaceshipDeck = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck`
);
export const fetchSpaceshipDeckSuccess = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck Success`,
  props<{ spaceshipDeck: Card[] }>()
);
export const fetchSpaceshipDeckFailure = createAction(
  `[${deckFeatureName}] Fetch Spaceship Deck Failure`
);

export const fetchHeroesCard = createAction(
  `[${deckFeatureName}] Fetch Hero Card`,
  props<{ uid: number }>()
);
export const fetchHeroesCardSuccess = createAction(
  `[${deckFeatureName}] Fetch Hero Card Success`,
  props<{ heroCard: HeroCard }>()
);
export const fetchHeroesCardFailure = createAction(
  `[${deckFeatureName}] Fetch Hero Card Failure`
);

export const fetchSpaceshipCard = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card`,
  props<{ uid: number }>()
);
export const fetchSpaceshipCardSuccess = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card Success`,
  props<{ spaceshipCard: SpaceshipCard }>()
);
export const fetchSpaceshipCardFailure = createAction(
  `[${deckFeatureName}] Fetch Spaceship Card Failure`
);
