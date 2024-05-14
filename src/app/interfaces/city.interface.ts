export interface City {
  airports: any;
  department: string;
  departmentId: number;
  description: string;
  id: number;
  indigenousReservations: any;
  name: string;
  population: number | any;
  postalCode: string | any;
  presidents: any;
  radios: any;
  surface: number | any;
  touristAttractions: any;
}

export interface CityDetail {
  id:                     number;
  name:                   string;
  description:            string;
  cityCapitalId:          number;
  municipalities:         number;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  postalCode:             string;
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

export interface CityCapital {
  id:                     number;
  name:                   string;
  description:            string;
  surface:                number;
  population:             number;
  postalCode:             string;
  departmentId:           number;
  department:             any;
  touristAttractions:     any;
  presidents:             any;
  indigenousReservations: any;
  airports:               any;
  radios:                 any;
}
