import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DeckState } from '../reducers';
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
