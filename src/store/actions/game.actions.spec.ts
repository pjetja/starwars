import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { Actions } from '@ngrx/effects';
import { hot, cold } from 'jasmine-marbles';
import { TestScheduler } from 'rxjs/testing';
import { gameFeatureName } from '../config';
import * as GameActions from './game.actions';

describe('Game Actions', () => {
  let store: MockStore;
  let actions: Actions;
  let scheduler: TestScheduler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [
        provideMockStore(),
        {
          provide: Actions,
          useValue: hot('-a-|', { a: {} }),
        },
      ],
    });

    store = TestBed.inject(MockStore);
    actions = TestBed.inject(Actions);
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should create the Set Number Of Rounds action', () => {
    const payload = { rounds: 5 };
    const action = GameActions.setNumberOfRounds(payload);
    expect(action.type).toEqual(`[${gameFeatureName}] Set Number Of Rounds`);
    expect(action.rounds).toEqual(payload.rounds);
  });

  it('should create the Start Game action', () => {
    const action = GameActions.startGame();
    expect(action.type).toEqual(`[${gameFeatureName}] Start Game`);
  });

  it('should create the Set Visibility action', () => {
    const payload: { visible: 1 | 2 } = { visible: 1 };
    const action = GameActions.setVisibility(payload);
    expect(action.type).toEqual(`[${gameFeatureName}] Set Visibility`);
    expect(action.visible).toEqual(payload.visible);
  });

  it('should create the Add Round action', () => {
    const action = GameActions.addRound();
    expect(action.type).toEqual(`[${gameFeatureName}] Add Round`);
  });

  it('should create the Select Round Deck action', () => {
    const payload: { deck: 1 | 2 } = { deck: 1 };
    const action = GameActions.selectRoundDeck(payload);
    expect(action.type).toEqual(`[${gameFeatureName}] Select Round Deck`);
    expect(action.deck).toEqual(payload.deck);
  });

  it('should create the Play Card action', () => {
    const payload: { card: number; deck: 1 | 2; player: 1 | 2; value: 5 } = {
      card: 1,
      deck: 1,
      player: 1,
      value: 5,
    };
    const action = GameActions.playCard(payload);
    expect(action.type).toEqual(`[${gameFeatureName}] Play Card`);
    expect(action.card).toEqual(payload.card);
    expect(action.deck).toEqual(payload.deck as 1 | 2);
    expect(action.player).toEqual(payload.player as 1 | 2);
    expect(action.value).toEqual(payload.value);
  });

  it('should create the Next Player action', () => {
    const action = GameActions.nextPlayer();
    expect(action.type).toEqual(`[${gameFeatureName}] Next Player`);
  });

  it('should create the Finish Round action', () => {
    const action = GameActions.finishRound();
    expect(action.type).toEqual(`[${gameFeatureName}] Finish Round`);
  });
});
