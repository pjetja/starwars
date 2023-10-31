import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import {
  Card,
  DeckState,
  heroesDeckSelector,
  isVisibleForPlayerSelector,
  spaceshipsDeckSelector,
} from 'src/store';

@Component({
  selector: 'app-card-deck',
  templateUrl: './app-card-deck.component.html',
  styleUrls: ['./app-card-deck.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppCardDeckComponent implements OnInit {
  @Input() player: 1 | 2;
  @Input() deckType: string;

  public cards$: Observable<Card[]>;
  public visibility$: Observable<boolean>;

  constructor(private store: Store<DeckState>) {}

  public ngOnInit(): void {
    this.cards$ =
      this.deckType === 'heroes'
        ? this.store.select(heroesDeckSelector(this.player))
        : this.store.select(spaceshipsDeckSelector(this.player));

    this.visibility$ = this.store.select(
      isVisibleForPlayerSelector(this.player)
    );
  }
}
