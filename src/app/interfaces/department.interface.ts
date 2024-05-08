export interface DepartmentsByRegionResponse {
  id:          number;
  name:        string;
  description: string;
  departments: Department[];
}

export interface Department {
  id:                     number;
  name:                   string;
  description:            string;
  cityCapitalId:          number;
  capitalCity?:            string;
  municipalities:         number;
  imageUrl:               string;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  cityCapital:            string;
  country:                any;
  cities:                 any;
  regionId:               number;
  region:                 any;
  naturalAreas:           any;
  maps:                   any;
  indigenousReservations: any;
  airports:               any;
}
