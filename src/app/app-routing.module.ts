import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { canLoadHerosData } from 'src/guards/heroes.guard';

import { AppGameComponent } from 'src/components/game/game.component';
import { canLoadSpaceshipData } from 'src/guards/spaceships.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [canLoadHerosData, canLoadSpaceshipData],
    component: AppGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
