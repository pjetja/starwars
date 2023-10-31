import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, first } from 'rxjs';
import {
  Card,
  DeckState,
  HeroCard,
  SpaceshipCard,
  fetchHeroesCard,
  fetchSpaceshipCard,
  heroCardDetailsSelector,
  showHeroCardDetails,
  showSpaceshipCardDetails,
  spaceshipCardDetailsSelector,
} from 'src/store';

@Component({
  selector: 'app-card-preview',
  templateUrl: './app-card-preview.component.html',
  styleUrls: ['./app-card-preview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardPreviewComponent {
  @Input() public card: Card;
  @Input() public deckType: string;
  @Input() public player: 1 | 2;
  @Input() public isVisible: boolean | null;

  constructor(private store: Store<DeckState>) {}

  public showCardDetails(): void {
    if (!this.isVisible) {
      return;
    }
    let cardDetails$;
    if (this.deckType === 'heroes') {
      cardDetails$ = this.store
        .select(heroCardDetailsSelector(this.card.uid))
        .pipe(first())
        .subscribe((card: HeroCard | undefined) => {
          if (card !== undefined) {
            this.store.dispatch(
              showHeroCardDetails({ uid: this.card.uid, player: this.player })
            );
          } else {
            this.store.dispatch(
              fetchHeroesCard({ uid: this.card.uid, player: this.player })
            );
          }
        });
    } else {
      cardDetails$ = this.store
        .select(spaceshipCardDetailsSelector(this.card.uid))
        .pipe(first())
        .subscribe((card: SpaceshipCard | undefined) => {
          if (card !== undefined) {
            this.store.dispatch(
              showSpaceshipCardDetails({
                uid: this.card.uid,
                player: this.player,
              })
            );
          } else {
            this.store.dispatch(
              fetchSpaceshipCard({ uid: this.card.uid, player: this.player })
            );
          }
        });
    }
  }
}
