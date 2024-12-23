import { City, CityCapital } from "./city.interface";

export interface DepartmentsByRegionResponse {
  id:          number;
  name:        string;
  description: string;
  departments: Department[];
}

export interface Department {
  id: number;
  name: string;
  description: string;
  cityCapitalId: number;
  municipalities: number;
  surface: number;
  population: number;
  phonePrefix: string;
  countryId: number;
  cityCapital: City;
  country: string | null;
  cities: string | null;
  imageUrl: string;
  regionId: number;
  region: string | null;
  naturalAreas: string | null;
  maps: string | null;
  indigenousReservations: string | null;
  airports: string | null;
}

export interface DepartmentDetail {
  id:                     number;
  name:                   string | any;
  description:            string;
  cityCapitalId:          number;
  municipalities:         number;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  capitalCityName:        string;
  cityCapital:            CityCapital;
  country:                any;
  cities:                 any;
  regionId:               number;
  region:                 any;
  naturalAreas:           any;
  maps:                   any;
  indigenousReservations: any;
  airports:               any;
}
