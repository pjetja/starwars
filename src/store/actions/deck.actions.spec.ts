import { Card } from '../reducers';
import * as DeckActions from './deck.actions';

describe('Deck Actions', () => {
  it('should create the Draw Hero Card action', () => {
    const payload = { player: 'empire' as 'empire' };
    const action = DeckActions.drawHeroCard(payload);

    expect(action.type).toEqual('[DECK] Draw Hero Card');
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Draw Spaceship Card action', () => {
    const payload = { player: 'rebellion' as 'rebellion' };
    const action = DeckActions.drawSpaceshipCard(payload);

    expect(action.type).toEqual('[DECK] Draw Spaceship Card');
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Set Heroes Deck action', () => {
    const heroesDeck: Card[] = [{ uid: 1, name: 'Card 1' }];
    const payload = { heroesDeck };
    const action = DeckActions.setHeroesDeck(payload);

    expect(action.type).toEqual('[DECK] Set Heroes Deck');
    expect(action.heroesDeck).toEqual(heroesDeck);
  });

  it('should create the Set Spaceship Deck action', () => {
    const spaceshipDeck: Card[] = [{ uid: 2, name: 'Card 2' }];
    const payload = { spaceshipDeck };
    const action = DeckActions.setSpaceshipDeck(payload);

    expect(action.type).toEqual('[DECK] Set Spaceship Deck');
    expect(action.spaceshipDeck).toEqual(spaceshipDeck);
  });

  it('should create the Show Hero Card Details action', () => {
    const payload = { uid: 1, player: 1 as 1 };
    const action = DeckActions.showHeroCardDetails(payload);

    expect(action.type).toEqual('[DECK] Show Hero Card Details');
    expect(action.uid).toEqual(payload.uid);
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Show Spaceship Card Details action', () => {
    const payload = { uid: 2, player: 2 as 2 };
    const action = DeckActions.showSpaceshipCardDetails(payload);

    expect(action.type).toEqual('[DECK] Show Spaceship Card Details');
    expect(action.uid).toEqual(payload.uid);
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Remove Used Cards action', () => {
    const action = DeckActions.removeUsedCards();

    expect(action.type).toEqual('[DECK] Remove Used Cards');
  });

  it('should create the Fetch Hero Deck action', () => {
    const action = DeckActions.fetchHeroesDeck();

    expect(action.type).toEqual('[DECK] Fetch Hero Deck');
  });

  it('should create the Fetch Hero Deck Success action', () => {
    const action = DeckActions.fetchHeroesDeckSuccess();

    expect(action.type).toEqual('[DECK] Fetch Hero Deck Success');
  });

  it('should create the Fetch Hero Deck Failure action', () => {
    const action = DeckActions.fetchHeroesDeckFailure();

    expect(action.type).toEqual('[DECK] Fetch Hero Deck Failure');
  });

  it('should create the Fetch Spaceship Deck action', () => {
    const action = DeckActions.fetchSpaceshipDeck();

    expect(action.type).toEqual('[DECK] Fetch Spaceship Deck');
  });

  it('should create the Fetch Spaceship Deck Success action', () => {
    const action = DeckActions.fetchSpaceshipDeckSuccess();

    expect(action.type).toEqual('[DECK] Fetch Spaceship Deck Success');
  });

  it('should create the Fetch Spaceship Deck Failure action', () => {
    const action = DeckActions.fetchSpaceshipDeckFailure();

    expect(action.type).toEqual('[DECK] Fetch Spaceship Deck Failure');
  });

  it('should create the Fetch Hero Card action', () => {
    const payload = { uid: 3, player: 1 as 1 };
    const action = DeckActions.fetchHeroesCard(payload);

    expect(action.type).toEqual('[DECK] Fetch Hero Card');
    expect(action.uid).toEqual(payload.uid);
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Fetch Hero Card Success action', () => {
    const action = DeckActions.fetchHeroesCardSuccess();

    expect(action.type).toEqual('[DECK] Fetch Hero Card Success');
  });

  it('should create the Fetch Hero Card Failure action', () => {
    const action = DeckActions.fetchHeroesCardFailure();

    expect(action.type).toEqual('[DECK] Fetch Hero Card Failure');
  });

  it('should create the Fetch Spaceship Card action', () => {
    const payload = { uid: 4, player: 2 as 2 };
    const action = DeckActions.fetchSpaceshipCard(payload);

    expect(action.type).toEqual('[DECK] Fetch Spaceship Card');
    expect(action.uid).toEqual(payload.uid);
    expect(action.player).toEqual(payload.player);
  });

  it('should create the Fetch Spaceship Card Success action', () => {
    const action = DeckActions.fetchSpaceshipCardSuccess();

    expect(action.type).toEqual('[DECK] Fetch Spaceship Card Success');
  });

  it('should create the Fetch Spaceship Card Failure action', () => {
    const action = DeckActions.fetchSpaceshipCardFailure();

    expect(action.type).toEqual('[DECK] Fetch Spaceship Card Failure');
  });
});
