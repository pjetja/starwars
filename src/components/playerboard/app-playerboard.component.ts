import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

@Component({
  selector: 'app-playerboard',
  templateUrl: './app-playerboard.component.html',
  styleUrls: ['./app-playerboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppPlayerboardComponent {
  @Input() public set player(player: 1 | 2) {
    this._player = player;
    this.playerName = this.player === 1 ? 'Empire' : 'Rebellion';
  }

  public get player(): 1 | 2 {
    return this._player;
  }
  public playerName: string;

  private _player: 1 | 2;
}
