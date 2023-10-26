import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { GameState, currentResultsSelector } from 'src/store';

@Component({
  selector: 'app-scoreboard',
  templateUrl: './app-scoreboard.component.html',
  styleUrls: ['./app-scoreboard.component.scss'],
})
export class AppScoreboardComponent implements OnInit, OnDestroy {
  public empireScore: number = 0;
  public rebellionScore: number = 0;
  public isDraw: boolean = false;
  public isEmpireWinning: boolean = false;
  public isRebellionWinning: boolean = false;

  private resultSubscription: Subscription;

  constructor(private store: Store<GameState>) {}

  public ngOnInit(): void {
    this.resultSubscription = this.store
      .select(currentResultsSelector)
      .subscribe((result) => {
        this.empireScore = result.empire;
        this.rebellionScore = result.rebellion;

        this.isDraw = this.empireScore === this.rebellionScore;
        this.isEmpireWinning =
          !this.isDraw && this.empireScore > this.rebellionScore;
        this.isRebellionWinning = !this.isDraw && !this.isEmpireWinning;
      });
  }

  public ngOnDestroy(): void {
    this.resultSubscription.unsubscribe();
  }
}
