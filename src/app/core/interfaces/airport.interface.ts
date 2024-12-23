import { City } from "./city.interface";
import { Department } from "./department.interface";

export interface Airport {
  city:        City;
  cityId:      number;
  deparmentId: number;
  department:  Department;
  iataCode:    string;
  id:          number;
  latitude:    number;
  longitude:   number;
  name:        string;
  oaciCode:    string;
  type:        string;
}

export interface AirportsPaged {
  page:         number;
  pageSize:     number;
  totalRecords: number;
  pageCount:    number;
  data:         Datum[];
}

export interface Datum {
  id:          number;
  name:        string;
  iataCode:    string;
  oaciCode:    string;
  type:        string;
  deparmentId: number;
  department:  Department;
  cityId:      number;
  city:        City;
  latitude:    number;
  longitude:   number;
}
