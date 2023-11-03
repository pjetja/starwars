import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { HeroesService } from './heros.service';

describe('HeroesService', () => {
  let service: HeroesService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroesService],
    });
    service = TestBed.inject(HeroesService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return a hero by ID', () => {
    const heroId = 1;

    service.getHero(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      `https://swapi.tech/api/people/${heroId}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should return a list of heroes', () => {
    service.getHeroes().subscribe((heroes) => {});

    const req = httpTestingController.expectOne(
      `https://swapi.tech/api/people?limit=82&page=0`
    );
    expect(req.request.method).toBe('GET');

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('82');
    expect(req.request.params.get('page')).toBe('0');
  });
});
