import { NgModule, isDevMode } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StoreModule } from '@ngrx/store';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppHeaderComponent } from 'src/components/header/app-header.component';
import { AppScoreboardComponent } from 'src/components/scoreboard/app-scoreboard.component';
import { AppStartGameComponent } from 'src/components/start-game/app-start-game.component';
import { AppFooterComponent } from 'src/components/footer/app-footer.component';
import { AppGemeBoardComponent } from 'src/components/gameboard/app-gameboard.component';
import { AppPlayerboardComponent } from 'src/components/playerboard/app-playerboard.component';

import { gameFeatureName } from 'src/store/config';
import { gameReducer } from 'src/store';
import { HeroesService } from 'src/services/heros.service';
import { SpaceshipService } from 'src/services/spaceship.service';

@NgModule({
  declarations: [
    AppComponent,
    AppHeaderComponent,
    AppFooterComponent,
    AppScoreboardComponent,
    AppStartGameComponent,
    AppGemeBoardComponent,
    AppPlayerboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(gameFeatureName, gameReducer),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [SpaceshipService, HeroesService],
  bootstrap: [AppComponent],
})
export class AppModule {}
