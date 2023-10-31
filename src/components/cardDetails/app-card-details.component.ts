import {
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import {
  Observable,
  Subscription,
  combineLatest,
  combineLatestWith,
  of,
  switchMap,
} from 'rxjs';
import {
  DeckState,
  GameState,
  HeroCard,
  SpaceshipCard,
  currentRoundDeckTypeSelector,
  empireSelectedCardSelector,
  isVisibleForAllSelector,
  isVisibleForPlayerSelector,
  playCard,
  rebellionSelectedCardSelector,
} from 'src/store';

@Component({
  selector: 'app-card-details',
  templateUrl: './app-card-details.component.html',
  styleUrls: ['./app-card-details.component.scss'],
})
export class AppCardDetailsComponent implements OnInit, OnDestroy {
  @Input() player: 1 | 2;

  public isVisible$: Observable<boolean>;

  public card: HeroCard | SpaceshipCard | undefined;
  public isCardPlayed: boolean = false;

  private _deckType: 1 | 2 | undefined;
  private cardSubscription: Subscription;
  private roundDeckSubscription: Subscription;

  constructor(
    private store: Store<DeckState | GameState>,
    private ref: ChangeDetectorRef
  ) {}

  // TODO: unblock card selection

  public ngOnInit(): void {
    const seletor =
      this.player === 1
        ? empireSelectedCardSelector
        : rebellionSelectedCardSelector;
    this.cardSubscription = this.store
      .select(seletor)
      .subscribe((card: HeroCard | SpaceshipCard | undefined) => {
        this.card = card;

        this.ref.detectChanges();
      });

    this.roundDeckSubscription = this.store
      .select(currentRoundDeckTypeSelector)
      .subscribe((deckType: 1 | 2 | undefined) => {
        this._deckType = deckType;
        this.isCardPlayed = false;
      });

    this.isVisible$ = combineLatest([
      this.store.select(isVisibleForPlayerSelector(this.player)),
      this.store.select(isVisibleForAllSelector),
    ]).pipe(
      switchMap(([player, all]) => {
        return of(player || all);
      })
    );
  }

  public ngOnDestroy(): void {
    this.cardSubscription.unsubscribe();
    this.roundDeckSubscription.unsubscribe();
  }

  public canPlayCard(): boolean {
    return (
      (this.isHeroCard(this.card) && this._deckType === 1) ||
      (this.isSpaceshipCard(this.card) && this._deckType === 2)
    );
  }

  public props(): string[] {
    if (this.isHeroCard(this.card)) {
      return Object.keys(<HeroCard>this.card).filter(
        (prop: string) => prop !== 'uid' && prop !== 'name'
      );
    }
    if (this.isSpaceshipCard(this.card)) {
      return Object.keys(<SpaceshipCard>this.card).filter(
        (prop: string) => prop !== 'uid' && prop !== 'name'
      );
    }
    return [];
  }

  public getProperty(key: string): string {
    return this.card ? (<any>this.card)[key] : '';
  }

  public getHumanizedKey(key: string): string {
    return key
      .replace(/([A-Z])/g, ' $1')
      .replace('_', ' ')
      .replace(/^./, (str) => str.toUpperCase());
  }

  public playCard(): void {
    if (this.card) {
      this.store.dispatch(
        playCard({
          card: this.card?.uid,
          deck: this.isHeroCard(this.card) ? 1 : 2,
          value: this.isHeroCard(this.card)
            ? (<HeroCard>this.card).height
            : (<SpaceshipCard>this.card).crew,
          player: this.player,
        })
      );
      this.isCardPlayed = true;
    }
  }

  private isHeroCard(
    card: HeroCard | SpaceshipCard | undefined
  ): card is HeroCard {
    return card !== undefined && (<HeroCard>card).height !== undefined;
  }

  private isSpaceshipCard(
    card: HeroCard | SpaceshipCard | undefined
  ): card is SpaceshipCard {
    return card !== undefined && (<SpaceshipCard>card).crew !== undefined;
  }
}
