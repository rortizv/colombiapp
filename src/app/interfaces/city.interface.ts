  export interface City {
    id:                     number;
    name:                   string;
    description:            string;
    surface:                number | null;
    population:             number | null;
    postalCode:             null | string;
    departmentId:           number;
    department:             string;
    touristAttractions:     any;
    presidents:             any;
    indigenousReservations: any;
    airports:               any;
    radios:                 any;
  }
