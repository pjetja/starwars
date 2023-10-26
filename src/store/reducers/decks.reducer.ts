import { Action, createReducer, on } from '@ngrx/store';
import * as actions from '../actions/deck.actions';

export interface Card {
  uid: number;
  name: string;
}

export interface HeroCard {
  height: number;
  mass: number;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  name: string;
  uid: number;
}

export interface SpaceshipCard {
  model: string;
  starship_class: string;
  manufacturer: string;
  cost_in_credits: number;
  length: number;
  crew: number;
  passengers: number;
  max_atmosphering_speed: number;
  hyperdrive_rating: number;
  MGLT: number;
  cargo_capacity: number;
  consumables: number;
  name: string;
  uid: number;
}

export interface DeckState {
  spaceshipsDeck: Card[];
  spaceshipsCards: SpaceshipCard[];
  spaceshipDeckSize: number;

  heroesCards: HeroCard[];
  heroesDeck: Card[];
  heroDeckSize: number;

  empireDeck: {
    spaceships: Card[];
    heroes: Card[];
  };

  rebellionDeck: {
    spaceships: Card[];
    heroes: Card[];
  };
}

export const initialDeckState: DeckState = {
  spaceshipsDeck: [],
  spaceshipsCards: [],
  spaceshipDeckSize: 36,
  heroesCards: [],
  heroesDeck: [],
  heroDeckSize: 82,
  empireDeck: {
    spaceships: [],
    heroes: [],
  },
  rebellionDeck: {
    spaceships: [],
    heroes: [],
  },
};

export function deckReducer(state: DeckState, action: Action) {
  return createReducer(
    initialDeckState,
    on(actions.drawHeroCard, onDrawHeroCard),
    on(actions.drawSpaceshipCard, onDrawSpaceshipCard),
    on(actions.setHeroesDeck, onSetHeroesDeck),
    on(actions.setSpaceshipDeck, onSetSpaceshipDeck),
    on(actions.setHeroCard, onSetHeroCard),
    on(actions.setSpaceshipCard, onSetSpaceshipCard),
    on(actions.playHeroCard, onPlayHeroCard),
    on(actions.playSpaceshipCard, onPlaySpaceshipCard)
  )(state, action);
}

function onDrawHeroCard(
  state: DeckState,
  { player }: { player: 'empire' | 'rebellion' }
): DeckState {
  const randomIndex = Math.floor(Math.random() * state.heroDeckSize);
  const randomHero = state.heroesDeck[randomIndex];

  if (player === 'empire') {
    return {
      ...state,
      heroDeckSize: state.heroDeckSize - 1,
      heroesDeck: state.heroesDeck
        .slice(0, randomIndex)
        .concat(state.heroesDeck.slice(randomIndex + 1)),
      empireDeck: {
        ...state.empireDeck,
        heroes: state.empireDeck.heroes.concat(randomHero),
      },
    };
  }

  if (player === 'rebellion') {
    return {
      ...state,
      heroDeckSize: state.heroDeckSize - 1,
      heroesDeck: state.heroesDeck
        .slice(0, randomIndex)
        .concat(state.heroesDeck.slice(randomIndex + 1)),
      rebellionDeck: {
        ...state.rebellionDeck,
        heroes: state.empireDeck.heroes.concat(randomHero),
      },
    };
  }

  return state;
}

function onDrawSpaceshipCard(
  state: DeckState,
  { player }: { player: 'empire' | 'rebellion' }
): DeckState {
  const randomIndex = Math.floor(Math.random() * state.spaceshipDeckSize);
  const randomSpaceship = state.spaceshipsDeck[randomIndex];

  if (player === 'empire') {
    return {
      ...state,
      spaceshipDeckSize: state.spaceshipDeckSize - 1,
      spaceshipsDeck: state.spaceshipsDeck
        .slice(0, randomIndex)
        .concat(state.spaceshipsDeck.slice(randomIndex + 1)),
      empireDeck: {
        ...state.empireDeck,
        spaceships: state.empireDeck.spaceships.concat(randomSpaceship),
      },
    };
  }

  if (player === 'rebellion') {
    return {
      ...state,
      spaceshipDeckSize: state.spaceshipDeckSize - 1,
      spaceshipsDeck: state.spaceshipsDeck
        .slice(0, randomIndex)
        .concat(state.spaceshipsDeck.slice(randomIndex + 1)),
      rebellionDeck: {
        ...state.rebellionDeck,
        spaceships: state.empireDeck.spaceships.concat(randomSpaceship),
      },
    };
  }

  return state;
}

function onSetHeroesDeck(
  state: DeckState,
  { heroesDeck }: { heroesDeck: Card[] }
): DeckState {
  return {
    ...state,
    heroesDeck,
  };
}

function onSetSpaceshipDeck(
  state: DeckState,
  { spaceshipDeck }: { spaceshipDeck: Card[] }
): DeckState {
  return {
    ...state,
    spaceshipsDeck: spaceshipDeck,
  };
}

function onSetHeroCard(
  state: DeckState,
  { heroCard }: { heroCard: HeroCard }
): DeckState {
  return {
    ...state,
    heroesCards: state.heroesCards.concat(heroCard),
  };
}

function onSetSpaceshipCard(
  state: DeckState,
  { spaceshipCard }: { spaceshipCard: SpaceshipCard }
): DeckState {
  return {
    ...state,
    spaceshipsCards: state.spaceshipsCards.concat(spaceshipCard),
  };
}

function onPlayHeroCard(
  state: DeckState,
  { player, card }: { player: 'empire' | 'rebellion'; card: HeroCard }
): DeckState {
  if (player === 'empire') {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        heroes: state.empireDeck.heroes.filter((hero) => hero.uid !== card.uid),
      },
    };
  }

  if (player === 'rebellion') {
    return {
      ...state,
      rebellionDeck: {
        ...state.rebellionDeck,
        heroes: state.rebellionDeck.heroes.filter(
          (hero) => hero.uid !== card.uid
        ),
      },
    };
  }

  return state;
}

function onPlaySpaceshipCard(
  state: DeckState,
  { player, card }: { player: 'empire' | 'rebellion'; card: SpaceshipCard }
): DeckState {
  if (player === 'empire') {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        spaceships: state.empireDeck.spaceships.filter(
          (spaceship) => spaceship.uid !== card.uid
        ),
      },
    };
  }

  if (player === 'rebellion') {
    return {
      ...state,
      rebellionDeck: {
        ...state.rebellionDeck,
        spaceships: state.rebellionDeck.spaceships.filter(
          (spaceship) => spaceship.uid !== card.uid
        ),
      },
    };
  }

  return state;
}
