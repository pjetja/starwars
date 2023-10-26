import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GameState, currentRoundSelector } from 'src/store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public currentRoundNumber$: Observable<number>;

  private readonly title: string = 'Star Wars Card Game';

  constructor(
    private titleService: Title,
    private store: Store<GameState>
  ) {
    this.titleService.setTitle(this.title);
  }

  public ngOnInit(): void {
    this.currentRoundNumber$ = this.store.select(currentRoundSelector);
  }
}
