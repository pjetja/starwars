import { Card, DeckState } from '../reducers';

import {
  rebellionDeckSelector,
  empireDeckSelector,
  heroCardDetailsSelector,
  spaceshipCardDetailsSelector,
  heroDeckSelector,
  spaceshipDeckSelector,
  heroesDeckSelector,
  empireSelectedCardSelector,
  rebellionSelectedCardSelector,
} from './deck.selectors';

const initialState: DeckState = {
  // Initialize with sample data for testing
  spaceshipsDeck: [{ uid: 1, name: 'Spaceship 1' }],
  spaceshipsCards: [
    {
      uid: 1,
      model: 'X-wing',
      starship_class: 'Starfighter',
      manufacturer: 'Incom Corporation',
      cost_in_credits: 149999,
      length: 12.5,
      crew: 1,
      passengers: 0,
      max_atmosphering_speed: '1050',
      hyperdrive_rating: 1.0,
      MGLT: 100,
      cargo_capacity: 110,
      consumables: '1 week',
      name: 'X-wing Starfighter',
    },
  ],
  spaceshipDeckSize: 1,
  heroesCards: [
    {
      uid: 1,
      height: 172,
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19 BBY',
      gender: 'male',
      name: 'Luke Skywalker',
    },
  ],
  heroesDeck: [{ uid: 1, name: 'Luke Skywalker' }],
  heroDeckSize: 0,
  empireDeck: {
    spaceships: [],
    heroes: [],
  },
  rebellionDeck: {
    spaceships: [],
    heroes: [],
  },
};

describe('Deck Selectors', () => {
  it('should select rebellion deck', () => {
    const rebellionDeck = {
      spaceships: [],
      heroes: [],
    };
    const result = rebellionDeckSelector.projector(initialState);
    expect(result).toEqual(rebellionDeck);
  });

  it('should select empire deck', () => {
    const empireDeck = {
      spaceships: [],
      heroes: [],
    };
    const result = empireDeckSelector.projector(initialState);
    expect(result).toEqual(empireDeck);
  });

  it('should select hero card details', () => {
    const cardId = 1;
    const expectedHeroCard = {
      uid: 1,
      height: 172,
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19 BBY',
      gender: 'male',
      name: 'Luke Skywalker',
    };
    const result = heroCardDetailsSelector(cardId).projector(initialState);
    expect(result).toEqual(expectedHeroCard);
  });

  it('should select spaceship card details', () => {
    const cardId = 1;
    const expectedSpaceshipCard = {
      uid: 1,
      model: 'X-wing',
      starship_class: 'Starfighter',
      manufacturer: 'Incom Corporation',
      cost_in_credits: 149999,
      length: 12.5,
      crew: 1,
      passengers: 0,
      max_atmosphering_speed: '1050',
      hyperdrive_rating: 1.0,
      MGLT: 100,
      cargo_capacity: 110,
      consumables: '1 week',
      name: 'X-wing Starfighter',
    };
    const result = spaceshipCardDetailsSelector(cardId).projector(initialState);
    expect(result).toEqual(expectedSpaceshipCard);
  });

  it('should select hero deck', () => {
    const expectedHeroDeck = [{ uid: 1, name: 'Luke Skywalker' }];
    const result = heroDeckSelector.projector(initialState);
    expect(result).toEqual(expectedHeroDeck);
  });

  it('should select spaceship deck', () => {
    const expectedSpaceshipDeck = [{ uid: 1, name: 'Spaceship 1' }];
    const result = spaceshipDeckSelector.projector(initialState);
    expect(result).toEqual(expectedSpaceshipDeck);
  });

  it('should select rebellion deck heroes', () => {
    const player = 2;
    const expectedHeroes: jasmine.Expected<jasmine.ArrayLike<Card>> = [];
    const result = heroesDeckSelector(player).projector(initialState);
    expect(result).toEqual(expectedHeroes);
  });

  it('should select empire selected card', () => {
    const expectedSelectedCard = undefined;
    const result = empireSelectedCardSelector.projector(initialState);
    expect(result).toEqual(expectedSelectedCard);
  });

  it('should select rebellion selected card', () => {
    const expectedSelectedCard = undefined;
    const result = rebellionSelectedCardSelector.projector(initialState);
    expect(result).toEqual(expectedSelectedCard);
  });
});
