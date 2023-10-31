import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import {
  GameState,
  currentRoundDeckTypeSelector,
  drawHeroCard,
  drawSpaceshipCard,
  finishRound,
  firstPlyaerInRoundSelector,
  playerSelectedCardSelector,
  selectRoundDeck,
  setVisibility,
  winnerSelector,
} from 'src/store';

@Component({
  selector: 'app-control',
  templateUrl: './app-control.component.html',
  styleUrls: ['./app-control.component.scss'],
})
export class AppControlComponent implements OnInit, OnDestroy {
  public selectedDeck$ = this.store.select(currentRoundDeckTypeSelector);
  public startPlayer$ = this.store.select(firstPlyaerInRoundSelector);
  public winner$ = this.store.select(winnerSelector);

  public firstPlayerPlayed: boolean = false;
  public secondPlayerPlayed: boolean = false;

  private fpSub: Subscription;
  private spSub: Subscription;

  constructor(
    private store: Store<GameState>,
    private cdRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.fpSub = this.store
      .select(playerSelectedCardSelector(1))
      .subscribe((played: boolean) => {
        this.firstPlayerPlayed = played;
        this.cdRef.detectChanges();
      });

    this.spSub = this.store
      .select(playerSelectedCardSelector(2))
      .subscribe((played: boolean) => {
        this.secondPlayerPlayed = played;
        this.cdRef.detectChanges();
      });
  }

  public ngOnDestroy(): void {
    this.fpSub.unsubscribe();
    this.spSub.unsubscribe();
  }

  public selectDeck(deckType: 1 | 2): void {
    this.store.dispatch(selectRoundDeck({ deck: deckType }));
  }

  public opositePlayer(player: 1 | 2): 1 | 2 {
    return player === 1 ? 2 : 1;
  }

  public humanizePlayer(player: 1 | 2): string {
    return player === 1 ? 'Empire' : 'Rebellion';
  }

  public selectCard(player: 1 | 2): void {
    this.store.dispatch(setVisibility({ visible: player }));
  }

  public fight(cardDeck: 1 | 2): void {
    this.store.dispatch(finishRound());
    if (cardDeck === 1) {
      this.store.dispatch(drawHeroCard({ player: 'empire' }));
      this.store.dispatch(drawHeroCard({ player: 'rebellion' }));
    } else {
      this.store.dispatch(drawSpaceshipCard({ player: 'empire' }));
      this.store.dispatch(drawSpaceshipCard({ player: 'rebellion' }));
    }
  }

  public nextGame(): void {
    window.location.reload();
  }
}
