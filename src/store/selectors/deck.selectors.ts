import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Card, DeckState } from '../reducers';
import { deckFeatureName } from '../config';

const DeckFeatureSelector = createFeatureSelector<DeckState>(deckFeatureName);

export const rebellionDeckSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => state?.rebellionDeck
);

export const empireDeckSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => state?.empireDeck
);

export const heroCardDetailsSelector = (cardId: number) =>
  createSelector(DeckFeatureSelector, (state: DeckState) => {
    return state.heroesCards.find((card) => card.uid === cardId);
  });

export const spaceshipCardDetailsSelector = (cardId: number) =>
  createSelector(DeckFeatureSelector, (state: DeckState) => {
    return state.spaceshipsCards.find((card) => card.uid === cardId);
  });

export const heroDeckSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => {
    return state.heroesDeck;
  }
);

export const spaceshipDeckSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => {
    return state.spaceshipsDeck;
  }
);

export const heroesDeckSelector = (player: number) =>
  createSelector(DeckFeatureSelector, (state: DeckState): Card[] => {
    return player === 1 ? state.empireDeck.heroes : state.rebellionDeck.heroes;
  });

export const spaceshipsDeckSelector = (player: number) =>
  createSelector(DeckFeatureSelector, (state: DeckState): Card[] => {
    return player === 1
      ? state.empireDeck.spaceships
      : state.rebellionDeck.spaceships;
  });

export const empireSelectedCardSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => state.empireDeck.selectedCard
);

export const rebellionSelectedCardSelector = createSelector(
  DeckFeatureSelector,
  (state: DeckState) => state.rebellionDeck.selectedCard
);
