export interface Map {
  id:           number;
  name:         string;
  description:  string;
  departmentId: number | null;
  urlImages:    string[];
  urlSource:    string;
  department:   string | null;
}
