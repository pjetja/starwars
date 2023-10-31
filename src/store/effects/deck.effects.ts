import { Injectable } from '@angular/core';
import { Actions, act, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, catchError, switchMap } from 'rxjs';
import {
  HeroResponse,
  HeroesResponse,
  HeroesService,
} from 'src/services/heros.service';
import {
  fetchHeroesDeck,
  fetchHeroesDeckSuccess,
  fetchHeroesDeckFailure,
  setHeroesDeck,
  setSpaceshipDeck,
  fetchSpaceshipDeck,
  fetchSpaceshipDeckFailure,
  fetchSpaceshipDeckSuccess,
  fetchHeroesCard,
  fetchHeroesCardSuccess,
  setHeroCard,
  fetchHeroesCardFailure,
  fetchSpaceshipCard,
  fetchSpaceshipCardSuccess,
  fetchSpaceshipCardFailure,
  setSpaceshipCard,
  showHeroCardDetails,
  showSpaceshipCardDetails,
} from '../actions';
import {
  SpaceshipResponse,
  SpaceshipService,
  SpaceshipsResponse,
} from 'src/services/spaceship.service';

@Injectable()
export class DeckEffects {
  public fetchHeroDeck$ = createEffect(() => this.fetchHeroDeck());
  public fetchSpaceshipDeck$ = createEffect(() => this.fetchSpaceshipDeck());

  public fetchHeroCard$ = createEffect(() => this.fetchHeroCard());
  public fetchSpaceshipCard$ = createEffect(() => this.fetchSpaceshipCard());

  constructor(
    private heroesService: HeroesService,
    private spaceshipService: SpaceshipService,
    private actions$: Actions
  ) {}

  private fetchHeroDeck(): Observable<Action> {
    return this.actions$.pipe(
      ofType(fetchHeroesDeck),
      switchMap(() =>
        this.heroesService.getHeroes().pipe(
          switchMap((response: HeroesResponse) => [
            fetchHeroesDeckSuccess(),
            setHeroesDeck({
              heroesDeck: response.results.map((hero) => ({
                uid: hero.uid,
                name: hero.name,
              })),
            }),
          ]),
          catchError(() => [fetchHeroesDeckFailure()])
        )
      )
    );
  }

  private fetchSpaceshipDeck(): Observable<Action> {
    return this.actions$.pipe(
      ofType(fetchSpaceshipDeck),
      switchMap(() =>
        this.spaceshipService.getSpaceships().pipe(
          switchMap((response: SpaceshipsResponse) => [
            fetchSpaceshipDeckSuccess(),
            setSpaceshipDeck({
              spaceshipDeck: response.results.map((ship) => ({
                uid: ship.uid,
                name: ship.name,
              })),
            }),
          ]),
          catchError(() => [fetchSpaceshipDeckFailure()])
        )
      )
    );
  }

  private fetchHeroCard(): Observable<Action> {
    return this.actions$.pipe(
      ofType(fetchHeroesCard),
      switchMap((action) =>
        this.heroesService.getHero(action.uid).pipe(
          switchMap((response: HeroResponse) => [
            fetchHeroesCardSuccess(),
            setHeroCard({
              heroCard: {
                height: response.result.properties.height,
                mass: response.result.properties.mass,
                hair_color: response.result.properties.hair_color,
                skin_color: response.result.properties.skin_color,
                eye_color: response.result.properties.eye_color,
                birth_year: response.result.properties.birth_year,
                gender: response.result.properties.gender,
                name: response.result.properties.name,
                uid: action.uid,
              },
            }),
            showHeroCardDetails(action),
          ]),
          catchError(() => [fetchHeroesCardFailure()])
        )
      )
    );
  }
  private fetchSpaceshipCard(): Observable<Action> {
    return this.actions$.pipe(
      ofType(fetchSpaceshipCard),
      switchMap((action) =>
        this.spaceshipService.getSpaceship(action.uid).pipe(
          switchMap((response: SpaceshipResponse) => [
            fetchSpaceshipCardSuccess(),
            setSpaceshipCard({
              spaceshipCard: {
                model: response.result.properties.model,
                starship_class: response.result.properties.starship_class,
                manufacturer: response.result.properties.manufacturer,
                cost_in_credits: response.result.properties.cost_in_credits,
                length: response.result.properties.length,
                crew: response.result.properties.crew,
                passengers: response.result.properties.passengers,
                max_atmosphering_speed:
                  response.result.properties.max_atmosphering_speed,
                hyperdrive_rating: response.result.properties.hyperdrive_rating,
                MGLT: response.result.properties.MGLT,
                cargo_capacity: response.result.properties.cargo_capacity,
                consumables: response.result.properties.consumables,
                name: response.result.properties.name,
                uid: action.uid,
              },
            }),
            showSpaceshipCardDetails(action),
          ]),
          catchError(() => [fetchSpaceshipCardFailure()])
        )
      )
    );
  }
}
