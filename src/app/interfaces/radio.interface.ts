import { City } from "./city.interface";

export interface Radio {
  id:        number;
  name:      string;
  frequency: number;
  band:      string;
  cityId:    number;
  city:      City;
  url:       string;
  streamers: string[];
}
