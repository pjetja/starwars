import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import {
  drawHeroCard,
  drawSpaceshipCard,
  setVisibility,
  addRound,
  startGame,
  nextPlayer,
  playCard,
  removeUsedCards,
  finishRound,
} from '../actions';
import { GameEffects } from './game.effects';

describe('GameEffects', () => {
  let effects: GameEffects;
  let actions: Observable<any>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameEffects, provideMockActions(() => actions)],
    });

    effects = TestBed.inject(GameEffects);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should handle startGame', () => {
    const expectedActions = [
      drawHeroCard({ player: 'empire' }),
      drawHeroCard({ player: 'rebellion' }),
      drawSpaceshipCard({ player: 'empire' }),
      drawSpaceshipCard({ player: 'rebellion' }),
      drawHeroCard({ player: 'empire' }),
      drawHeroCard({ player: 'rebellion' }),
      drawSpaceshipCard({ player: 'empire' }),
      drawSpaceshipCard({ player: 'rebellion' }),
      drawHeroCard({ player: 'empire' }),
      drawHeroCard({ player: 'rebellion' }),
      drawSpaceshipCard({ player: 'empire' }),
      drawSpaceshipCard({ player: 'rebellion' }),
      drawHeroCard({ player: 'empire' }),
      drawHeroCard({ player: 'rebellion' }),
      drawSpaceshipCard({ player: 'empire' }),
      drawSpaceshipCard({ player: 'rebellion' }),
      drawHeroCard({ player: 'empire' }),
      drawHeroCard({ player: 'rebellion' }),
      drawSpaceshipCard({ player: 'empire' }),
      drawSpaceshipCard({ player: 'rebellion' }),
      setVisibility({ visible: 0 }),
      addRound(),
    ];

    actions = hot('a', { a: startGame() });

    expect(effects.startGame$).toBeObservable(
      hot('(abcdefghijklmnopqrstuv)', {
        a: expectedActions[0],
        b: expectedActions[1],
        c: expectedActions[2],
        d: expectedActions[3],
        e: expectedActions[4],
        f: expectedActions[5],
        g: expectedActions[6],
        h: expectedActions[7],
        i: expectedActions[8],
        j: expectedActions[9],
        k: expectedActions[10],
        l: expectedActions[11],
        m: expectedActions[12],
        n: expectedActions[13],
        o: expectedActions[14],
        p: expectedActions[15],
        q: expectedActions[16],
        r: expectedActions[17],
        s: expectedActions[18],
        t: expectedActions[19],
        u: expectedActions[20],
        v: expectedActions[21],
      })
    );
  });

  it('should handle playCard', () => {
    const expectedActions = [setVisibility({ visible: 0 }), nextPlayer()];

    actions = hot('a', {
      a: playCard({ card: 1, deck: 1, player: 1, value: '10' }),
    });

    expect(effects.playCard$).toBeObservable(
      hot('(ab)', { a: expectedActions[0], b: expectedActions[1] })
    );
  });

  it('should handle finishRound', () => {
    const expectedActions = [removeUsedCards(), addRound()];

    actions = hot('a', { a: finishRound() });

    expect(effects.finishRound$).toBeObservable(
      hot('(ab)', { a: expectedActions[0], b: expectedActions[1] })
    );
  });
});
