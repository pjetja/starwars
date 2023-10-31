import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { AppHeaderComponent } from 'src/components/header/app-header.component';
import { AppScoreboardComponent } from 'src/components/scoreboard/app-scoreboard.component';
import { AppStartGameComponent } from 'src/components/start-game/app-start-game.component';
import { AppGemeBoardComponent } from 'src/components/gameboard/app-gameboard.component';
import { AppPlayerboardComponent } from 'src/components/playerboard/app-playerboard.component';
import { AppGameComponent } from 'src/components/game/game.component';
import { AppCardDeckComponent } from 'src/components/cardDeck/app-card-deck.component';
import { AppCardPreviewComponent } from 'src/components/cardPreview/app-card-preview.component';
import { AppCardDetailsComponent } from 'src/components/cardDetails/app-card-details.component';
import { AppControlComponent } from 'src/components/control/app-control.component';

import { deckFeatureName, gameFeatureName } from 'src/store/config';
import { GameEffects, deckReducer, gameReducer } from 'src/store';

import { HeroesService } from 'src/services/heros.service';
import { SpaceshipService } from 'src/services/spaceship.service';
import { HerosDataGuard } from 'src/guards/heroes.guard';
import { EffectsModule } from '@ngrx/effects';
import { DeckEffects } from 'src/store/effects/deck.effects';

@NgModule({
  declarations: [
    AppComponent,
    AppGameComponent,
    AppHeaderComponent,
    AppScoreboardComponent,
    AppStartGameComponent,
    AppGemeBoardComponent,
    AppPlayerboardComponent,
    AppCardDeckComponent,
    AppCardPreviewComponent,
    AppCardDetailsComponent,
    AppControlComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CommonModule,
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(gameFeatureName, gameReducer),
    StoreModule.forFeature(deckFeatureName, deckReducer),
    EffectsModule.forRoot([DeckEffects, GameEffects]),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({ maxAge: 25, logOnly: !isDevMode() }),
  ],
  providers: [SpaceshipService, HeroesService, HerosDataGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
