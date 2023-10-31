import { Injectable, inject } from '@angular/core';
import { CanMatchFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, filter, map, tap } from 'rxjs';
import { Card, DeckState, spaceshipDeckSelector } from 'src/store';
import { fetchSpaceshipDeck } from 'src/store/actions/deck.actions';

@Injectable({
  providedIn: 'root',
})
export class SpaceshipDataGuard {
  constructor(private store: Store<DeckState>) {}

  public isDataLoaded(): Observable<boolean> {
    return this.store.select(spaceshipDeckSelector).pipe(
      tap((deck: Card[]) => {
        if (deck.length === 0) {
          this.store.dispatch(fetchSpaceshipDeck());
        }
      }),
      filter((deck: Card[]) => deck.length > 0),
      map(() => true)
    );
  }
}

export const canLoadSpaceshipData: CanMatchFn = () => {
  return inject(SpaceshipDataGuard).isDataLoaded();
};
