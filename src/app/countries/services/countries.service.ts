import { CacheStoreI } from './../interfaces/chace-store.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    //propiedades
    private apiUrl: string = 'https://restcountries.com/v3.1'

    public cacheStore: CacheStoreI = {

        byCapital: { term: '', countries: [] },
        byCountries: { term: '', countries: [] },
        byRegion: { region: '', countries: [] },

    }

    //constructor
    constructor(private http: HttpClient) {
        console.log('countriesService init');

    }


    private getCountriespRequest(url: string): Observable<Country[]> {
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([])),
                // delay(2000),
            );
    }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null)),
            );
    }

    //método para buscar por capital
    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.getCountriespRequest(url);
    }

    //método para buscar por pais 
    searchCountry(tem: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${tem}`
        return this.getCountriespRequest(url);
    }

    //método para buscar por region
    searchRegion(tem: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${tem}`
        return this.getCountriespRequest(url);
    }


}//cierre clase 