import { GameState, RoundDetails, SelectedCard } from '../reducers';

import {
  currentRoundDeckTypeSelector,
  currentRoundDetailsSelector,
  currentRoundSelector,
  firstPlyaerInRoundSelector,
  isVisibleForAllSelector,
  isVisibleForPlayerSelector,
  playerSelectedCardSelector,
  totalNumberOfRoundsSelector,
  winnerSelector,
} from './game.selectors';

const initialState: GameState = {
  numberOfRounds: null,
  rounds: [],
  currentView: 0,
  currentPlayer: 1,
  currentRoundNumber: 0,
  results: {
    empire: 0,
    rebellion: 0,
  },
};

describe('GameSelectors', () => {
  it('should select number of rounds', () => {
    const testData = {
      numberOfRounds: 10,
    };
    const result = totalNumberOfRoundsSelector.projector({
      ...initialState,
      ...testData,
    });
    const expected = 10;
    expect(result).toEqual(expected);
  });

  it('should select current number', () => {
    const testData = {
      currentRoundNumber: 10,
    };
    const result = currentRoundSelector.projector({
      ...initialState,
      ...testData,
    });
    const expected = 10;
    expect(result).toEqual(expected);
  });

  it('should select current round details', () => {
    const result1 = currentRoundSelector.projector({
      ...initialState,
    });
    expect(result1).toBe(0);

    const testData: RoundDetails = {
      round: 1,
      starts: 1,
    };

    const result2 = currentRoundDetailsSelector.projector({
      ...initialState,
      currentRound: testData,
    });
    const expected: RoundDetails = {
      round: 1,
      starts: 1,
    };
    expect(result2).toEqual(expected);
  });

  it('should select current round deck type', () => {
    const testData: RoundDetails = {
      round: 1,
      starts: 1,
      deckType: 1,
    };
    const result = currentRoundDeckTypeSelector.projector({
      ...initialState,
      currentRound: testData,
    });
    const expected = 1;
    expect(result).toEqual(expected);
  });

  it('should select current round start player', () => {
    const testData: RoundDetails = {
      round: 1,
      starts: 1,
    };
    const result = firstPlyaerInRoundSelector.projector({
      ...initialState,
      currentRound: testData,
    });
    const expected = 1;
    expect(result).toEqual(expected);
  });

  it('should select current round player card', () => {
    const testData: RoundDetails = {
      round: 1,
      starts: 1,
      deckType: 1,
      empire: {
        cardIndex: 1,
        cardValue: 1,
      } as SelectedCard,
    };
    const result = playerSelectedCardSelector(1).projector({
      ...initialState,
      currentRound: testData,
    });

    expect(result).toBeTrue();
  });

  it('should select visible for player', () => {
    const testData = 1;
    const result1 = isVisibleForPlayerSelector(1).projector({
      ...initialState,
      currentView: testData,
    });
    const result2 = isVisibleForPlayerSelector(2).projector({
      ...initialState,
      currentView: testData,
    });

    expect(result1).toBeTrue();
    expect(result2).toBeFalse();
  });

  it('should select current round player card', () => {
    const testData: RoundDetails = {
      round: 1,
      starts: 1,
      deckType: 1,
      empire: {
        cardIndex: 1,
        cardValue: 1,
      } as SelectedCard,
      rebellion: {
        cardIndex: 2,
        cardValue: 2,
      } as SelectedCard,
    };
    const result = isVisibleForAllSelector.projector({
      ...initialState,
      currentRound: testData,
    });

    expect(result).toBeTrue();
  });

  it('should select winner', () => {
    const testData = 1;
    const result = winnerSelector.projector({
      ...initialState,
      winner: testData,
    });
    const expected = 1;
    expect(result).toEqual(expected);
  });
});
