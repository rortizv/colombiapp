import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ColombiaInfo } from '../interfaces/colombia.interface';
import { Department, DepartmentsByRegionResponse } from '../interfaces/department.interface';
import { Region } from '../interfaces/region.interface';
import { City } from '../interfaces/city.interface';

@Injectable({
  providedIn: 'root',
})
export class ApicolombiaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getColombiaInfo(): Observable<ColombiaInfo> {
    const url = `${this.apiUrl}/Country/Colombia`;
    return this.http.get<ColombiaInfo>(url);
  }

  getRegions(): Observable<Region[]> {
    const url = `${this.apiUrl}/Region`;
    return this.http.get<Region[]>(url);
  }

  getDepartments(): Observable<Department[]> {
    const url = `${this.apiUrl}/Department`;
    return this.http.get<Department[]>(url);
  }

  getCities(): Observable<City[]> {
    const url = `${this.apiUrl}/City`;
    return this.http.get<City[]>(url);
  }

  getCityById(cityId: number): Observable<City> {
    const url = `${this.apiUrl}/City/${cityId}`;
    return this.http.get<City>(url);
  }

  getDepartmentsByRegion(regionId: number): Observable<DepartmentsByRegionResponse> {
    const url = `${this.apiUrl}/Region/${regionId}/departments`;
    return this.http.get<DepartmentsByRegionResponse>(url);
  }

}
