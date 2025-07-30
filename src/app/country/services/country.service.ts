import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Country } from '../interfaces/couuntry.interface';
import { combineLatest, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CountryService {
  private baseUrl: string = 'https://restcountries.com/v3.1';
  private http = inject(HttpClient);

  private _region = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];

  get regions(): string[] {
    return [...this._region];
  }

  getCountriesByRegion(region: string): Observable<Country[]> {
    if(!region) return of([]);

    const url = `${this.baseUrl}/region/${region}?fields=name,cca3`;
    return this.http.get<Country[]>(url);
  }

  getCountruByAlphaCode(alphaCode: string): Observable<Country> {
    const url = `${this.baseUrl}/alpha/${alphaCode}?fields=cca3,name,borders`;
    return this.http.get<Country>(url);
  }

  getCountryNamesByCodeArray(countryCodes: string[]): Observable<Country[]> {
    if(!countryCodes || countryCodes.length === 0) return of([])

    const countriesRequest: Observable<Country>[] = [];

    countryCodes.forEach(code => {
      const request = this.getCountruByAlphaCode(code);
      countriesRequest.push(request);
    });

    return combineLatest(countriesRequest);
  }


}
