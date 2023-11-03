import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { SpaceshipService } from './spaceship.service';

describe('SpaceshipService', () => {
  let service: SpaceshipService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SpaceshipService],
    });
    service = TestBed.inject(SpaceshipService);
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

    service.getSpaceship(1).subscribe(() => {});
    const req = httpTestingController.expectOne(
      `https://swapi.tech/api/starships/${heroId}`
    );
    expect(req.request.method).toBe('GET');
  });

  it('should return a list of heroes', () => {
    service.getSpaceships().subscribe((heroes) => {});

    const req = httpTestingController.expectOne(
      `https://swapi.tech/api/starships?limit=36&page=0`
    );
    expect(req.request.method).toBe('GET');

    expect(req.request.method).toBe('GET');
    expect(req.request.params.get('limit')).toBe('36');
    expect(req.request.params.get('page')).toBe('0');
  });
});
