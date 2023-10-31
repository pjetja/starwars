import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface HeroResponse {
  message: string;
  result: {
    properties: {
      height: number;
      mass: number;
      hair_color: string;
      skin_color: string;
      eye_color: string;
      birth_year: string;
      gender: string;
      name: string;

      created: Date;
      edited: Date;
      homeworld: string;
      url: string;
    };
    description: string;
    _id: string;
    uid: number;
    __v: number;
  };
}

interface HeroListElem {
  uid: number;
  name: string;
  url: string;
}

export interface HeroesResponse {
  message: string;
  total_records: number;
  total_pages: number;
  previous: string;
  next: string;
  results: HeroListElem[];
}

@Injectable({
  providedIn: 'root',
})
export class HeroesService {
  private readonly baseUrl = 'https://swapi.tech/api/people';
  constructor(private httpClient: HttpClient) {}

  public getHero(id: number): Observable<HeroResponse> {
    return this.httpClient.get<HeroResponse>(`${this.baseUrl}/${id}`);
  }

  public getHeroes(): Observable<HeroesResponse> {
    return this.httpClient.get<HeroesResponse>(this.baseUrl, {
      params: {
        limit: 82,
        page: 0,
      },
    });
  }
}
