import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ColombiaInfo } from '../interfaces/colombia.interface';
import { Department, DepartmentDetail, DepartmentsByRegionResponse } from '../interfaces/department.interface';
import { Region } from '../interfaces/region.interface';
import { City } from '../interfaces/city.interface';
import { Radio } from '../interfaces/radio.interface';
import { President, PresidentsResp } from '../interfaces/president.interface';
import { Airport, AirportsPaged } from '../interfaces/airport.interface';
import { ConstitutionArticle } from '../interfaces/constitution-article.interface';
import { Map } from '../interfaces/map.interface';

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

  getDepartmentById(departmentId: number): Observable<DepartmentDetail> {
    const url = `${this.apiUrl}/Department/${departmentId}`;
    return this.http.get<DepartmentDetail>(url);
  }

  getCities(): Observable<City[]> {
    const url = `${this.apiUrl}/City`;
    return this.http.get<City[]>(url);
  }

  searchCityByName(search: string): Observable<City[]> {
    const url = `${this.apiUrl}/City/search/${search}`;
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

  getPresidents(): Observable<President[]> {
    const url = `${this.apiUrl}/President`;
    return this.http.get<President[]>(url);
  }

  getPresidentsPaged(page: number, pageSize: number): Observable<PresidentsResp> {
    const url = `${this.apiUrl}/President/pagedList?Page=${page}&PageSize=${pageSize}`;
    return this.http.get<PresidentsResp>(url);
  }

  getAirports(): Observable<Airport[]> {
    const url = `${this.apiUrl}/Airport`;
    return this.http.get<Airport[]>(url);
  }

  getAirportsPaged(page: number, pageSize: number): Observable<AirportsPaged> {
    const url = `${this.apiUrl}/Airport/pagedList?Page=${page}&PageSize=${pageSize}`;
    return this.http.get<AirportsPaged>(url);
  }

  getArticleById(articleId: number): Observable<ConstitutionArticle> {
    const url = `${this.apiUrl}/ConstitutionArticle/${articleId}`;
    return this.http.get<ConstitutionArticle>(url);
  }

  getRadioStations(): Observable<Radio[]> {
    const url = `${this.apiUrl}/Radio`;
    return this.http.get<Radio[]>(url);
  }

  getMaps(): Observable<Map[]> {
    const url = `${this.apiUrl}/Map`;
    return this.http.get<Map[]>(url);
  }

}
