import { Injectable } from '@angular/core';
import { Region, SmallCountry } from '../interface/country.interface';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private baseUrl = 'https://restcountries.com/v3.1';

  private _region: Region[] = [Region.Africa, Region.Americas, Region.Asia, Region.Europe, Region.Oceania];

  constructor(private http: HttpClient) { }

  get regions(): Region[] {
    return [...this._region];
  }

  getCountriesByRegion(region: Region): Observable<SmallCountry[]> {
    if (!region) return of([]);
    return this.http.get<SmallCountry[]>(`${this.baseUrl}/region/${region}?fields=cca3,name,borders`);
  }
}
