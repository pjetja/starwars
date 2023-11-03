import { TestBed } from '@angular/core/testing';
import { HerosDataGuard } from './heroes.guard';
import { Store } from '@ngrx/store';

import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { DeckState, heroDeckSelector, initialDeckState } from 'src/store';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HeroesService } from 'src/services/heros.service';

describe('HerosDataGuard', () => {
  let guard: HerosDataGuard;

  let heroServiceSpy: any;
  let store: MockStore<DeckState>;

  const initialState: DeckState = initialDeckState;

  beforeEach(() => {
    heroServiceSpy = {
      getHeroes: () => [] as any,
    };

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        HerosDataGuard,
        { provide: HeroesService, useValue: heroServiceSpy },
        provideMockStore({ initialState }),
      ],
    });

    store = TestBed.inject(Store) as MockStore<DeckState>;
    guard = TestBed.inject(HerosDataGuard);
  });

  it('should not allow - epmty state', () => {
    store.overrideSelector(heroDeckSelector, [] as any);
    let expected;
    guard.isDataLoaded().subscribe((value) => {
      expected = value;
    });

    expect(expected).toBeUndefined();
  });

  it('should allow', () => {
    store.overrideSelector(heroDeckSelector, [{} as any] as any);

    guard.isDataLoaded().subscribe((value) => {
      console.log('expected', value);
      expect(value).toBeTrue();
    });
  });
});
