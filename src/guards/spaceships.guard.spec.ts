import { TestBed } from '@angular/core/testing';

import { Store } from '@ngrx/store';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeckState, initialDeckState, spaceshipDeckSelector } from 'src/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { SpaceshipDataGuard } from './spaceships.guard';
import { SpaceshipService } from 'src/services/spaceship.service';

describe('SpaceshipDataGuard', () => {
  let guard: SpaceshipDataGuard;

  let spaceshipServiceSpy: any;
  let store: MockStore<DeckState>;

  const initialState: DeckState = initialDeckState;

  beforeEach(() => {
    spaceshipServiceSpy = {
      getSpaceships: () => [] as any,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        SpaceshipDataGuard,
        { provide: SpaceshipService, useValue: spaceshipServiceSpy },
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.inject(Store) as MockStore<DeckState>;
    guard = TestBed.inject(SpaceshipDataGuard);
  });

  it('should not allow - epmty state', () => {
    store.overrideSelector(spaceshipDeckSelector, [] as any);
    let expected;
    guard.isDataLoaded().subscribe((value) => {
      expected = value;
    });

    expect(expected).toBeUndefined();
  });

  it('should allow', () => {
    store.overrideSelector(spaceshipDeckSelector, [{} as any] as any);

    guard.isDataLoaded().subscribe((value) => {
      console.log('expected', value);
      expect(value).toBeTrue();
    });
  });
});
