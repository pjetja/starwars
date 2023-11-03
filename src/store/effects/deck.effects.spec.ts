import { TestBed } from '@angular/core/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable, of, throwError } from 'rxjs';
import {
  HeroesService,
  HeroesResponse,
  HeroResponse,
} from 'src/services/heros.service';
import {
  SpaceshipService,
  SpaceshipsResponse,
  SpaceshipResponse,
} from 'src/services/spaceship.service';
import {
  fetchHeroesDeckSuccess,
  setHeroesDeck,
  fetchHeroesDeck,
  fetchHeroesDeckFailure,
  fetchSpaceshipDeckSuccess,
  setSpaceshipDeck,
  fetchSpaceshipDeck,
  fetchSpaceshipDeckFailure,
  fetchHeroesCardSuccess,
  setHeroCard,
  showHeroCardDetails,
  fetchHeroesCard,
  fetchHeroesCardFailure,
  fetchSpaceshipCardSuccess,
  setSpaceshipCard,
  showSpaceshipCardDetails,
  fetchSpaceshipCard,
  fetchSpaceshipCardFailure,
} from '../actions';
import { DeckEffects } from './deck.effects';

import { provideMockActions } from '@ngrx/effects/testing';

const mockStarhipsResponse: SpaceshipResponse = {
  message: 'ok',
  result: {
    properties: {
      model: 'DS-1 Orbital Battle Station',
      starship_class: 'Deep Space Mobile Battlestation',
      manufacturer:
        'Imperial Department of Military Research, Sienar Fleet Systems',
      cost_in_credits: 1000000000000,
      length: 120000,
      crew: 342953,
      passengers: 843342,
      max_atmosphering_speed: 'n/a',
      hyperdrive_rating: 4.0,
      MGLT: 10,
      cargo_capacity: 1000000000000,
      consumables: '3 years',
      pilots: [],
      created: new Date('2020-09-17T17:55:06.604Z'),
      edited: new Date('2020-09-17T17:55:06.604Z'),
      name: 'Death Star',
      url: 'https://www.swapi.tech/api/starships/9',
    },

    description: 'A Starship',
    _id: '5f63a34fee9fd7000499be21',
    uid: 9,
    __v: 0,
  },
};

const mockSpaceship = {
  model: mockStarhipsResponse.result.properties.model,
  starship_class: mockStarhipsResponse.result.properties.starship_class,
  manufacturer: mockStarhipsResponse.result.properties.manufacturer,
  cost_in_credits: mockStarhipsResponse.result.properties.cost_in_credits,
  length: mockStarhipsResponse.result.properties.length,
  crew: mockStarhipsResponse.result.properties.crew,
  passengers: mockStarhipsResponse.result.properties.passengers,
  max_atmosphering_speed:
    mockStarhipsResponse.result.properties.max_atmosphering_speed,
  hyperdrive_rating: mockStarhipsResponse.result.properties.hyperdrive_rating,
  MGLT: mockStarhipsResponse.result.properties.MGLT,
  cargo_capacity: mockStarhipsResponse.result.properties.cargo_capacity,
  consumables: mockStarhipsResponse.result.properties.consumables,
  name: mockStarhipsResponse.result.properties.name,
  uid: 2,
};

const mockSpaceshipsResponse: SpaceshipsResponse = {
  message: 'ok',
  total_records: 36,
  total_pages: 4,
  previous: '1',
  next: 'https://www.swapi.tech/api/starships?page=2&limit=10',
  results: [
    {
      uid: 2,
      name: 'CR90 corvette',
      url: 'https://www.swapi.tech/api/starships/2',
    },
  ],
};

const mockHeroResponse: HeroResponse = {
  message: 'ok',
  result: {
    properties: {
      height: 172,
      mass: 77,
      hair_color: 'blond',
      skin_color: 'fair',
      eye_color: 'blue',
      birth_year: '19BBY',
      gender: 'male',
      created: new Date('2023-11-02T19:58:08.927Z'),
      edited: new Date('2023-11-02T19:58:08.927Z'),
      name: 'Luke Skywalker',
      homeworld: 'https://www.swapi.tech/api/planets/1',
      url: 'https://www.swapi.tech/api/people/1',
    },
    description: 'A person within the Star Wars universe',
    _id: '5f63a36eee9fd7000499be42',
    uid: 1,
    __v: 0,
  },
};

const mockHero = {
  height: mockHeroResponse.result.properties.height,
  mass: mockHeroResponse.result.properties.mass,
  hair_color: mockHeroResponse.result.properties.hair_color,
  skin_color: mockHeroResponse.result.properties.skin_color,
  eye_color: mockHeroResponse.result.properties.eye_color,
  birth_year: mockHeroResponse.result.properties.birth_year,
  gender: mockHeroResponse.result.properties.gender,
  name: mockHeroResponse.result.properties.name,
  uid: 1,
};

const mockHeroesResponse: HeroesResponse = {
  message: 'ok',
  total_records: 82,
  total_pages: 9,
  previous: '1',
  next: 'https://www.swapi.tech/api/people?page=2&limit=10',
  results: [
    {
      uid: 1,
      name: 'Luke Skywalker',
      url: 'https://www.swapi.tech/api/people/1',
    },
  ],
};

describe('DeckEffects', () => {
  let effects: DeckEffects;
  let actions: Observable<any>;

  const heroesServiceSpy = jasmine.createSpyObj('HeroesService', [
    'getHeroes',
    'getHero',
  ]);
  const spaceshipServiceSpy = jasmine.createSpyObj('SpaceshipService', [
    'getSpaceships',
    'getSpaceship',
  ]);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DeckEffects,
        provideMockActions(() => actions),
        { provide: HeroesService, useValue: heroesServiceSpy },
        { provide: SpaceshipService, useValue: spaceshipServiceSpy },
      ],
    });

    effects = TestBed.inject(DeckEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle fetchHeroesDeck', () => {
    const heroesResponse: HeroesResponse = mockHeroesResponse;
    const expected = cold('(ab)', {
      a: fetchHeroesDeckSuccess(),
      b: setHeroesDeck({ heroesDeck: [{ uid: 1, name: 'Luke Skywalker' }] }),
    });
    heroesServiceSpy.getHeroes.and.returnValue(of(heroesResponse));

    actions = hot('a', { a: fetchHeroesDeck() });

    expect(effects.fetchHeroDeck$).toBeObservable(expected);
  });

  it('should handle fetchHeroesDeck failure', () => {
    heroesServiceSpy.getHeroes.and.returnValue(throwError('Error'));
    const expected = cold('a', { a: fetchHeroesDeckFailure() });

    actions = hot('a', { a: fetchHeroesDeck() });

    expect(effects.fetchHeroDeck$).toBeObservable(expected);
  });

  it('should handle fetchSpaceshipDeck', () => {
    const spaceshipResponse: SpaceshipsResponse = mockSpaceshipsResponse;
    const expected = cold('(ab)', {
      a: fetchSpaceshipDeckSuccess(),
      b: setSpaceshipDeck({
        spaceshipDeck: [{ uid: 2, name: 'CR90 corvette' }],
      }),
    });
    spaceshipServiceSpy.getSpaceships.and.returnValue(of(spaceshipResponse));

    actions = hot('a', { a: fetchSpaceshipDeck() });

    expect(effects.fetchSpaceshipDeck$).toBeObservable(expected);
  });

  it('should handle fetchSpaceshipDeck failure', () => {
    spaceshipServiceSpy.getSpaceships.and.returnValue(throwError('Error'));
    const expected = cold('a', { a: fetchSpaceshipDeckFailure() });

    actions = hot('a', { a: fetchSpaceshipDeck() });

    expect(effects.fetchSpaceshipDeck$).toBeObservable(expected);
  });

  it('should handle fetchHeroCard', () => {
    const heroResponse: HeroResponse = mockHeroResponse;
    const expected = cold('(abc)', {
      a: fetchHeroesCardSuccess(),
      b: setHeroCard({ heroCard: mockHero }),
      c: showHeroCardDetails({ uid: 1, player: 1 }),
    });
    heroesServiceSpy.getHero.and.returnValue(of(heroResponse));

    actions = hot('a', { a: fetchHeroesCard({ uid: 1, player: 1 }) });

    expect(effects.fetchHeroCard$).toBeObservable(expected);
  });

  it('should handle fetchHeroCard failure', () => {
    heroesServiceSpy.getHero.and.returnValue(throwError('Error'));
    const expected = cold('a', { a: fetchHeroesCardFailure() });

    actions = hot('a', { a: fetchHeroesCard({ uid: 1, player: 1 }) });

    expect(effects.fetchHeroCard$).toBeObservable(expected);
  });

  it('should handle fetchSpaceshipCard', () => {
    const spaceshipResponse: SpaceshipResponse = mockStarhipsResponse;
    const expected = cold('(abc)', {
      a: fetchSpaceshipCardSuccess(),
      b: setSpaceshipCard({ spaceshipCard: mockSpaceship }),
      c: showSpaceshipCardDetails({ uid: 2, player: 2 }),
    });
    spaceshipServiceSpy.getSpaceship.and.returnValue(of(spaceshipResponse));

    actions = hot('a', { a: fetchSpaceshipCard({ uid: 2, player: 2 }) });

    expect(effects.fetchSpaceshipCard$).toBeObservable(expected);
  });

  it('should handle fetchSpaceshipCard failure', () => {
    spaceshipServiceSpy.getSpaceship.and.returnValue(throwError('Error'));
    const expected = cold('a', { a: fetchSpaceshipCardFailure() });

    actions = hot('a', { a: fetchSpaceshipCard({ uid: 2, player: 2 }) });

    expect(effects.fetchSpaceshipCard$).toBeObservable(expected);
  });
});
