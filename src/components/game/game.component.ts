import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState, currentRoundSelector } from 'src/store';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss'],
})
export class AppGameComponent implements OnInit {
  public currentRoundNumber$: Observable<number>;

  constructor(private store: Store<GameState>) {}

  public ngOnInit(): void {
    this.currentRoundNumber$ = this.store.select(currentRoundSelector);
  }
}
