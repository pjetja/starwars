import { Injectable, inject } from '@angular/core';
import { CanLoadFn, CanMatchFn } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { Observable, filter, first, map, of, switchMap, tap } from 'rxjs';
import { Card, DeckState, heroDeckSelector } from 'src/store';
import { fetchHeroesDeck } from 'src/store/actions/deck.actions';

@Injectable({
  providedIn: 'root',
})
export class HerosDataGuard {
  constructor(private store: Store<DeckState>) {}

  public isDataLoaded(): Observable<boolean> {
    return this.store.select(heroDeckSelector).pipe(
      tap((deck: Card[]) => {
        if (deck.length === 0) {
          this.store.dispatch(fetchHeroesDeck());
        }
      }),
      filter((deck: Card[]) => deck.length > 0),
      map(() => true)
    );
  }
}

export const canLoadHerosData: CanMatchFn = () => {
  return inject(HerosDataGuard).isDataLoaded();
};
