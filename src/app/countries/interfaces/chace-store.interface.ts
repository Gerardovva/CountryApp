import { Country } from "./country";
import { Region } from "./region.type";

export interface CacheStoreI {
    byCapital: TermCountriesI;
    byCountries: TermCountriesI;
    byRegion: RegionCountries; 
}

export interface TermCountriesI {
    term: string;
    countries: Country[];
}
export interface RegionCountries {
    region?: Region;
    countries: Country[];
}