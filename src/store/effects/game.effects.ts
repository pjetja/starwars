import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  addRound,
  drawHeroCard,
  drawSpaceshipCard,
  finishRound,
  nextPlayer,
  playCard,
  removeUsedCards,
  setVisibility,
  startGame,
} from '../actions';
import { Observable, switchMap } from 'rxjs';
import { Action } from '@ngrx/store';

@Injectable()
export class GameEffects {
  public startGame$ = createEffect(() => this.startGame());
  public playCard$ = createEffect(() => this.playCard());
  public finishRound$ = createEffect(() => this.finishRound());

  constructor(private actions$: Actions) {}

  private startGame(): Observable<Action> {
    return this.actions$.pipe(
      ofType(startGame),
      switchMap(() => {
        const actions = [];
        for (let i = 0; i < 5; i++) {
          actions.push(drawHeroCard({ player: 'empire' }));
          actions.push(drawHeroCard({ player: 'rebellion' }));
          actions.push(drawSpaceshipCard({ player: 'empire' }));
          actions.push(drawSpaceshipCard({ player: 'rebellion' }));
        }

        actions.push(setVisibility({ visible: 0 }));
        actions.push(addRound());

        return actions;
      })
    );
  }

  private playCard(): Observable<Action> {
    return this.actions$.pipe(
      ofType(playCard),
      switchMap(() => [setVisibility({ visible: 0 }), nextPlayer()])
    );
  }

  private finishRound(): Observable<Action> {
    return this.actions$.pipe(
      ofType(finishRound),
      switchMap(() => [
        // draw new cards
        removeUsedCards(),
        addRound(),
      ])
    );
  }
}
