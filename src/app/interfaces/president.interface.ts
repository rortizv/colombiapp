export interface President {
  id:              number;
  image:           string | null;
  name:            string;
  lastName:        string;
  fullName:        string;
  startPeriodDate: Date;
  endPeriodDate:   Date | null;
  politicalParty:  string;
  description:     string;
  cityId:          number;
  city:            string | null;
}
