import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, of } from 'rxjs';
import { Country } from '../interfaces/country';

@Injectable({ providedIn: 'root' })
export class CountriesService {
    //propiedades
    private apiUrl: string = 'https://restcountries.com/v3.1'

    //constructor
    constructor(private http: HttpClient) { }

    searchCountryByAlphaCode(code: string): Observable<Country | null> {
        const url = `${this.apiUrl}/alpha/${code}`;
        return this.http.get<Country[]>(url)
            .pipe(
                map(countries => countries.length > 0 ? countries[0] : null),
                catchError(() => of(null))
            );
    }

    //método para buscar por capital
    searchCapital(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/capital/${term}`;
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }

    //método para buscar por pais 
    searchCountry(tem: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${tem}`
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }

    //método para buscar por region
    searchRegion(tem: string): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${tem}`
        return this.http.get<Country[]>(url)
            .pipe(
                catchError(() => of([]))
            );
    }


}//cierre clase 