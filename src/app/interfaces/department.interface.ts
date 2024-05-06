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
  municipalities:         number;
  surface:                number;
  population:             number;
  phonePrefix:            string;
  countryId:              number;
  cityCapital:            null;
  country:                null;
  cities:                 null;
  regionId:               number;
  region:                 null;
  naturalAreas:           null;
  maps:                   null;
  indigenousReservations: null;
  airports:               null;
}
