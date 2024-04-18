import { CacheStoreI } from './../interfaces/chace-store.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, delay, map, of, tap } from 'rxjs';
import { Country } from '../interfaces/country';
import { Region } from '../interfaces/region.type';

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
        // console.log('countriesService init');
        this.loadFromLocalStorage();
    }

    private saveToLocalStorage() {
        localStorage.setItem('cacheStore', JSON.stringify(this.cacheStore));
    }

    private loadFromLocalStorage() {
        if (!localStorage.getItem('cacheStore')) return;
        this.cacheStore = JSON.parse(localStorage.getItem('cacheStore')!);
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
        return this.getCountriespRequest(url).pipe(
            tap((countries) => this.cacheStore.byCapital = { term: term, countries: countries }),
            tap(() => this.saveToLocalStorage())
        )
    }

    //método para buscar por pais 
    searchCountry(term: string): Observable<Country[]> {
        const url = `${this.apiUrl}/name/${term}`
        return this.getCountriespRequest(url).pipe(
            tap((countries) => this.cacheStore.byCountries = { term: term, countries: countries }),
            tap(() => this.saveToLocalStorage()),
        )
    }

    //método para buscar por region
    searchRegion(region: Region): Observable<Country[]> {
        const url = `${this.apiUrl}/region/${region}`
        return this.getCountriespRequest(url).pipe(
            tap((countries) => this.cacheStore.byRegion = { region, countries: countries }),
            tap(() => this.saveToLocalStorage())
        )
    }


}//cierre clase 