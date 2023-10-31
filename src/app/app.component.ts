import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public currentRoundNumber$: Observable<number>;

  private readonly title: string = 'Star Wars Card Game';

  constructor(private titleService: Title) {
    this.titleService.setTitle(this.title);
  }
}
