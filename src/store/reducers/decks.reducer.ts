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
    selectedCard?: HeroCard | SpaceshipCard;
  };

  rebellionDeck: {
    spaceships: Card[];
    heroes: Card[];
    selectedCard?: HeroCard | SpaceshipCard;
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
    on(actions.showHeroCardDetails, onShowHeroCardDetails),
    on(actions.showSpaceshipCardDetails, onShowSpaceshipCardDetails),
    on(actions.removeUsedCards, onRemoveUsedCards)
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
        heroes: state.rebellionDeck.heroes.concat(randomHero),
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
        spaceships: state.rebellionDeck.spaceships.concat(randomSpaceship),
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

function onShowHeroCardDetails(
  state: DeckState,
  { player, uid }: { player: 1 | 2; uid: number }
): DeckState {
  if (player === 1) {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        selectedCard: state.heroesCards.find((hero) => hero.uid === uid),
      },
    };
  }

  if (player === 2) {
    return {
      ...state,
      rebellionDeck: {
        ...state.rebellionDeck,
        selectedCard: state.heroesCards.find((hero) => hero.uid === uid),
      },
    };
  }

  return state;
}

function onShowSpaceshipCardDetails(
  state: DeckState,
  { player, uid }: { player: 1 | 2; uid: number }
): DeckState {
  if (player === 1) {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        selectedCard: state.spaceshipsCards.find(
          (spaceship) => spaceship.uid === uid
        ),
      },
    };
  }

  if (player === 2) {
    return {
      ...state,
      rebellionDeck: {
        ...state.rebellionDeck,
        selectedCard: state.spaceshipsCards.find(
          (spaceship) => spaceship.uid === uid
        ),
      },
    };
  }

  return state;
}

function onRemoveUsedCards(state: DeckState): DeckState {
  const selectedCardDeck =
    (<HeroCard>state.empireDeck.selectedCard).height !== undefined ? 1 : 2;
  const selectedEmpireCard = state.empireDeck.selectedCard;
  const selectedRebellionCard = state.rebellionDeck.selectedCard;

  if (selectedCardDeck === 1) {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        heroes: state.empireDeck.heroes.filter(
          (hero) => hero.uid !== selectedEmpireCard?.uid
        ),
        selectedCard: undefined,
      },
      rebellionDeck: {
        ...state.rebellionDeck,
        heroes: state.rebellionDeck.heroes.filter(
          (hero) => hero.uid !== selectedRebellionCard?.uid
        ),
        selectedCard: undefined,
      },
    };
  } else {
    return {
      ...state,
      empireDeck: {
        ...state.empireDeck,
        spaceships: state.empireDeck.spaceships.filter(
          (spaceship) => spaceship.uid !== selectedEmpireCard?.uid
        ),
        selectedCard: undefined,
      },
      rebellionDeck: {
        ...state.rebellionDeck,
        spaceships: state.rebellionDeck.spaceships.filter(
          (spaceship) => spaceship.uid !== selectedRebellionCard?.uid
        ),
        selectedCard: undefined,
      },
    };
  }
}
