import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import {
  GameState,
  setNumberOfRounds,
  startGame,
  totalNumberOfRoundsSelector,
} from 'src/store';

interface Round {
  size: number;
}

@Component({
  selector: 'app-start-game',
  templateUrl: './app-start-game.component.html',
  styleUrls: ['./app-start-game.component.scss'],
})
export class AppStartGameComponent implements OnInit, OnDestroy {
  public numberOfRounds: number | null;

  private numberOfRoundsSubscription: Subscription;

  constructor(private gameStore: Store<GameState>) {}

  public rounds: Round[] = [{ size: 1 }, { size: 5 }, { size: 10 }];

  public ngOnInit(): void {
    this.numberOfRoundsSubscription = this.gameStore
      .pipe(select(totalNumberOfRoundsSelector))
      .subscribe((numberOfRounds: number | null) => {
        this.numberOfRounds = numberOfRounds;
      });
  }

  public ngOnDestroy(): void {
    this.numberOfRoundsSubscription.unsubscribe();
  }

  public setNumberOfRounds(round: Round): void {
    this.gameStore.dispatch(setNumberOfRounds({ rounds: round.size }));
  }

  public startGame(): void {
    this.gameStore.dispatch(startGame());
  }
}
