import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface SpaceshipResponse {
  message: string;
  result: {
    properties: {
      model: string;
      starship_class: string;
      manufacturer: string;
      cost_in_credits: number;
      length: number;
      crew: number;
      passengers: number;
      max_atmosphering_speed: number;
      hyperdrive_rating: number;
      MGLT: number;
      cargo_capacity: number;
      consumables: number;
      name: string;

      created: Date;
      edited: Date;

      url: string;
    };
    description: string;
    _id: string;
    uid: number;
    __v: number;
  };
}

interface SpaceshipListElem {
  uid: number;
  name: string;
  url: string;
}

export interface SpaceshipsResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  next: string;
  results: SpaceshipListElem[];
}

@Injectable({
  providedIn: 'root',
})
export class SpaceshipService {
  private readonly baseUrl = 'https://swapi.dev/api/starships/';
  constructor(private httpClient: HttpClient) {}

  public getSpaceship(id: number): Observable<SpaceshipResponse> {
    return this.httpClient.get<SpaceshipResponse>(`${this.baseUrl}${id}`);
  }

  public getSpaceships(): Observable<SpaceshipsResponse> {
    return this.httpClient.get<SpaceshipsResponse>(this.baseUrl);
  }
}
