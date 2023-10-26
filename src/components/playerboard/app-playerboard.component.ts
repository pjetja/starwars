import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-playerboard',
  templateUrl: './app-playerboard.component.html',
  styleUrls: ['./app-playerboard.component.scss'],
})
export class AppPlayerboardComponent {
  @Input() public player: number;
}
