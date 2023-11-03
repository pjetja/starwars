import * as actions from '../actions/deck.actions';
import {
  initialDeckState,
  deckReducer,
  DeckState,
  HeroCard,
  SpaceshipCard,
} from './decks.reducer';

describe('deckReducer', () => {
  it('should return the initial state', () => {
    const initialState = initialDeckState;
    const action = {} as any;
    const state = deckReducer(initialState, action);
    expect(state).toBe(initialState);
  });

  it('should handle drawHeroCard action for empire', () => {
    const initialState = {
      ...initialDeckState,
      heroesDeck: [{ uid: 1, name: 'Hero 1' }],
      heroDeckSize: 1,
      empireDeck: {
        heroes: [],
        spaceships: [],
      },
    };
    const action = actions.drawHeroCard({ player: 'empire' });
    const state = deckReducer(initialState, action);
    expect(state.empireDeck.heroes).toContain({ uid: 1, name: 'Hero 1' });
    expect(state.heroDeckSize).toBe(0);
  });

  it('should handle drawHeroCard action for rebellion', () => {
    const initialState = {
      ...initialDeckState,
      heroesDeck: [{ uid: 1, name: 'Hero 1' }],
      heroDeckSize: 1,
      rebellionDeck: {
        heroes: [],
        spaceships: [],
      },
    };
    const action = actions.drawHeroCard({ player: 'rebellion' });
    const state = deckReducer(initialState, action);
    expect(state.rebellionDeck.heroes).toContain({ uid: 1, name: 'Hero 1' });
    expect(state.heroDeckSize).toBe(0);
  });

  it('should handle drawSpaceshipCard action for empire', () => {
    const initialState = {
      ...initialDeckState,
      spaceshipsDeck: [{ uid: 1, name: 'Spaceship 1' }],
      spaceshipDeckSize: 1,
      empireDeck: {
        spaceships: [],
        heroes: [],
      },
    };
    const action = actions.drawSpaceshipCard({ player: 'empire' });
    const state = deckReducer(initialState, action);
    expect(state.empireDeck.spaceships).toContain({
      uid: 1,
      name: 'Spaceship 1',
    });
    expect(state.spaceshipDeckSize).toBe(0);
  });

  it('should handle drawSpaceshipCard action for rebellion', () => {
    const initialState: DeckState = {
      spaceshipsDeck: [{ uid: 1, name: 'Spaceship 1' }],
      spaceshipsCards: [],
      spaceshipDeckSize: 1,
      heroesCards: [],
      heroesDeck: [],
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

    const action = actions.drawSpaceshipCard({ player: 'rebellion' });
    const state = deckReducer(initialState, action);

    expect(state.rebellionDeck.spaceships).toContain({
      uid: 1,
      name: 'Spaceship 1',
    });
    expect(state.spaceshipDeckSize).toBe(0);
    expect(state.rebellionDeck.spaceships).toContain({
      uid: 1,
      name: 'Spaceship 1',
    });
    expect(state.spaceshipDeckSize).toBe(0);
  });

  it('should handle setHeroesDeck action', () => {
    const initialState = {
      ...initialDeckState,
      heroesDeck: [],
    };
    const action = actions.setHeroesDeck({
      heroesDeck: [{ uid: 1, name: 'Hero 1' }],
    });
    const state = deckReducer(initialState, action);
    expect(state.heroesDeck).toEqual([{ uid: 1, name: 'Hero 1' }]);
  });

  it('should handle setSpaceshipDeck action', () => {
    const initialState = {
      ...initialDeckState,
      spaceshipsDeck: [],
    };
    const action = actions.setSpaceshipDeck({
      spaceshipDeck: [{ uid: 1, name: 'Spaceship 1' }],
    });
    const state = deckReducer(initialState, action);
    expect(state.spaceshipsDeck).toEqual([{ uid: 1, name: 'Spaceship 1' }]);
  });

  it('should handle setHeroCard action', () => {
    const initialState = {
      ...initialDeckState,
      heroesCards: [],
    };
    const action = actions.setHeroCard({
      heroCard: {
        uid: 1,
        height: 180,
        mass: 70,
        hair_color: 'Black',
        skin_color: 'Fair',
        eye_color: 'Brown',
        birth_year: '1990',
        gender: 'Male',
        name: 'Hero 1',
      },
    });
    const state = deckReducer(initialState, action);
    expect(state.heroesCards).toEqual([
      {
        uid: 1,
        height: 180,
        mass: 70,
        hair_color: 'Black',
        skin_color: 'Fair',
        eye_color: 'Brown',
        birth_year: '1990',
        gender: 'Male',
        name: 'Hero 1',
      },
    ]);
  });

  it('should handle setSpaceshipCard action', () => {
    const initialState = {
      ...initialDeckState,
      spaceshipsCards: [],
    };
    const action = actions.setSpaceshipCard({
      spaceshipCard: {
        uid: 1,
        model: 'Model X',
        starship_class: 'Class A',
        manufacturer: 'Manufacturer A',
        cost_in_credits: 100000,
        length: 10,
        crew: 5,
        passengers: 10,
        max_atmosphering_speed: 'Mach 5',
        hyperdrive_rating: 1.5,
        MGLT: 100,
        cargo_capacity: 200,
        consumables: '1 year',
        name: 'Spaceship 1',
      },
    });
    const state = deckReducer(initialState, action);
    expect(state.spaceshipsCards).toEqual([
      {
        uid: 1,
        model: 'Model X',
        starship_class: 'Class A',
        manufacturer: 'Manufacturer A',
        cost_in_credits: 100000,
        length: 10,
        crew: 5,
        passengers: 10,
        max_atmosphering_speed: 'Mach 5',
        hyperdrive_rating: 1.5,
        MGLT: 100,
        cargo_capacity: 200,
        consumables: '1 year',
        name: 'Spaceship 1',
      },
    ]);
  });

  it('should handle showHeroCardDetails action for player 1', () => {
    const initialState = {
      ...initialDeckState,
      heroesCards: [
        {
          uid: 1,
          height: 180,
          mass: 70,
          hair_color: 'Black',
          skin_color: 'Fair',
          eye_color: 'Brown',
          birth_year: '1990',
          gender: 'Male',
          name: 'Hero 1',
        },
        {
          uid: 2,
          height: 170,
          mass: 60,
          hair_color: 'Blonde',
          skin_color: 'Pale',
          eye_color: 'Blue',
          birth_year: '1995',
          gender: 'Female',
          name: 'Hero 2',
          homeworld: 'Earth',
        },
      ],
      empireDeck: {
        spaceships: [],
        heroes: [],
      },
      rebellionDeck: {
        spaceships: [],
        heroes: [],
      },
    };
    const action = actions.showHeroCardDetails({ player: 1, uid: 1 });
    const state = deckReducer(initialState, action);
    expect(state.empireDeck.selectedCard).toEqual({
      uid: 1,
      height: 180,
      mass: 70,
      hair_color: 'Black',
      skin_color: 'Fair',
      eye_color: 'Brown',
      birth_year: '1990',
      gender: 'Male',
      name: 'Hero 1',
    });
  });

  it('should handle showSpaceshipCardDetails action for player 1', () => {
    const initialState: DeckState = {
      spaceshipsCards: [
        {
          uid: 1,
          name: 'Spaceship 1',
          model: 'X-Wing',
          starship_class: 'Starfighter',
          manufacturer: 'Incom Corporation',
          cost_in_credits: 149999,
          length: 12.5,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1050,
          hyperdrive_rating: 1.0,
          MGLT: 100,
          cargo_capacity: 110,
          consumables: '1 week',
        },
        {
          uid: 2,
          name: 'Spaceship 2',
          model: 'TIE Fighter',
          starship_class: 'Starfighter',
          manufacturer: 'Sienar Fleet Systems',
          cost_in_credits: 75000,
          length: 6.4,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1200,
          hyperdrive_rating: 1.0,
          MGLT: 100,
          cargo_capacity: 65,
          consumables: '2 days',
        },
      ],
      empireDeck: {
        selectedCard: undefined,
        spaceships: [],
        heroes: [],
      },
      rebellionDeck: {
        selectedCard: undefined,
        spaceships: [],
        heroes: [],
      },
      spaceshipsDeck: [],
      spaceshipDeckSize: 0,
      heroesCards: [],
      heroesDeck: [],
      heroDeckSize: 0,
    };
    const action = actions.showSpaceshipCardDetails({ player: 1, uid: 1 });
    const state = deckReducer(initialState, action);
    expect(state.empireDeck.selectedCard).toEqual({
      uid: 1,
      name: 'Spaceship 1',
      model: 'X-Wing',
      starship_class: 'Starfighter',
      manufacturer: 'Incom Corporation',
      cost_in_credits: 149999,
      length: 12.5,
      crew: 1,
      passengers: 0,
      max_atmosphering_speed: 1050,
      hyperdrive_rating: 1.0,
      MGLT: 100,
      cargo_capacity: 110,
      consumables: '1 week',
    });
  });

  it('should handle onRemoveUsedCards action for hero card (deck 1)', () => {
    const initialState: DeckState = {
      ...initialDeckState,
      heroesCards: [
        {
          uid: 1,
          name: 'Hero 1',
          height: 180,
          mass: 80,
          hair_color: 'brown',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
        } as HeroCard,
        {
          uid: 2,
          name: 'Hero 2',
          height: 170,
          mass: 60,
          hair_color: 'blonde',
          skin_color: 'fair',
          eye_color: 'green',
          birth_year: '22BBY',
          gender: 'female',
        } as HeroCard,
      ],
      empireDeck: {
        spaceships: [],
        heroes: [
          {
            uid: 1,
            name: 'Hero 1',
            height: 180,
            mass: 80,
            hair_color: 'brown',
            skin_color: 'fair',
            eye_color: 'blue',
            birth_year: '19BBY',
            gender: 'male',
          } as HeroCard,
        ],
        selectedCard: {
          uid: 1,
          name: 'Hero 1',
          height: 180,
          mass: 80,
          hair_color: 'brown',
          skin_color: 'fair',
          eye_color: 'blue',
          birth_year: '19BBY',
          gender: 'male',
        } as HeroCard,
      },
      rebellionDeck: {
        spaceships: [],
        heroes: [
          {
            uid: 2,
            name: 'Hero 2',
            height: 170,
            mass: 60,
            hair_color: 'blonde',
            skin_color: 'fair',
            eye_color: 'green',
            birth_year: '22BBY',
            gender: 'female',
          } as HeroCard,
        ],
        selectedCard: {
          uid: 2,
          name: 'Hero 2',
          height: 170,
          mass: 60,
          hair_color: 'blonde',
          skin_color: 'fair',
          eye_color: 'green',
          birth_year: '22BBY',
          gender: 'female',
        } as HeroCard,
      },
      spaceshipsDeck: [],
      spaceshipDeckSize: 0,
      heroesDeck: [],
      heroDeckSize: 0,
    };

    const action = actions.removeUsedCards();
    const state = deckReducer(initialState, action);

    expect(state.rebellionDeck.heroes).toEqual([]);
    expect(state.rebellionDeck.selectedCard).toEqual(undefined);
  });

  it('should handle onRemoveUsedCards action for spaceship card (deck 2)', () => {
    const initialState: DeckState = {
      heroesCards: [],
      spaceshipsCards: [
        {
          uid: 1,
          name: 'Spaceship 1',
          model: 'X-wing',
          starship_class: 'Starfighter',
          manufacturer: 'Incom Corporation',
          cost_in_credits: 149999,
          length: 12.5,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1050,
          hyperdrive_rating: 1.0,
          MGLT: 100,
          cargo_capacity: 110,
          consumables: '1 week',
        },
        {
          uid: 2,
          name: 'Spaceship 2',
          model: 'TIE Advanced x1',
          starship_class: 'Starfighter',
          manufacturer: 'Sienar Fleet Systems',
          cost_in_credits: 120000,
          length: 9.2,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1200,
          hyperdrive_rating: 1.0,
          MGLT: 105,
          cargo_capacity: 150,
          consumables: '5 days',
        },
      ],
      empireDeck: {
        heroes: [],
        spaceships: [
          {
            uid: 1,
            name: 'Spaceship 1',
          },
        ],
        selectedCard: {
          uid: 1,
          name: 'Spaceship 1',
          model: 'X-wing',
          starship_class: 'Starfighter',
          manufacturer: 'Incom Corporation',
          cost_in_credits: 149999,
          length: 12.5,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1050,
          hyperdrive_rating: 1.0,
          MGLT: 100,
          cargo_capacity: 110,
          consumables: '1 week',
        },
      },
      rebellionDeck: {
        heroes: [],
        spaceships: [
          {
            uid: 2,
            name: 'Spaceship 2',
          },
        ],
        selectedCard: {
          uid: 2,
          name: 'Spaceship 2',
          model: 'TIE Advanced x1',
          starship_class: 'Starfighter',
          manufacturer: 'Sienar Fleet Systems',
          cost_in_credits: 120000,
          length: 9.2,
          crew: 1,
          passengers: 0,
          max_atmosphering_speed: 1200,
          hyperdrive_rating: 1.0,
          MGLT: 105,
          cargo_capacity: 150,
          consumables: '5 days',
        } as SpaceshipCard,
      },
      spaceshipsDeck: [],
      spaceshipDeckSize: 0,
      heroesDeck: [],
      heroDeckSize: 0,
    };

    const action = actions.removeUsedCards();
    const state = deckReducer(initialState, action);

    expect(state.empireDeck.spaceships).toEqual([]);
    expect(state.empireDeck.selectedCard).toBeUndefined();
    expect(state.rebellionDeck.spaceships).toEqual([]);
    expect(state.rebellionDeck.selectedCard).toEqual(undefined);
  });
});
