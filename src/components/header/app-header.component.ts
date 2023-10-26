import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState, currentRoundSelector } from 'src/store';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
})
export class AppHeaderComponent {
  public currentRoundNumber$: Observable<number>;

  private readonly title: string = 'Star Wars Card Game';

  constructor(private store: Store<GameState>) {}

  public ngOnInit(): void {
    this.currentRoundNumber$ = this.store.select(currentRoundSelector);
  }
}
