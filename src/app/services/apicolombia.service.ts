import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';

import { environment } from 'src/environments/environment';

import { ColombiaInfo } from '../interfaces/colombia.interface';
import { Department, DepartmentDetail, DepartmentsByRegionResponse } from '../interfaces/department.interface';
import { Region } from '../interfaces/region.interface';
import { City } from '../interfaces/city.interface';
import { Radio } from '../interfaces/radio.interface';
import { President, PresidentsResp } from '../interfaces/president.interface';
import { Airport, AirportsPaged } from '../interfaces/airport.interface';
import { ConstitutionArticle } from '../interfaces/constitution-article.interface';
import { ToolsService } from './tools.service';

@Injectable({
  providedIn: 'root',
})
export class ApicolombiaService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private toolsService: ToolsService,
  ) { }

  getColombiaInfo(): Observable<ColombiaInfo> {
    const url = `${this.apiUrl}/Country/Colombia`;
    return this.http.get<ColombiaInfo>(url).pipe(
      catchError(this.toolsService.handleError<ColombiaInfo>('getColombiaInfo', {} as ColombiaInfo))
    );
  }

  getRegions(): Observable<Region[]> {
    const url = `${this.apiUrl}/Region`;
    return this.http.get<Region[]>(url).pipe(
      catchError(this.toolsService.handleError<Region[]>('getRegions', []))
    );
  }

  getDepartments(): Observable<Department[]> {
    const url = `${this.apiUrl}/Department`;
    return this.http.get<Department[]>(url).pipe(
      catchError(this.toolsService.handleError<Department[]>('getDepartments', []))
    );
  }

  getDepartmentById(departmentId: number): Observable<DepartmentDetail> {
    const url = `${this.apiUrl}/Department/${departmentId}`;
    return this.http.get<DepartmentDetail>(url).pipe(
      catchError(this.toolsService.handleError<DepartmentDetail>('getDepartmentById', {} as DepartmentDetail))
    );
  }

  getCities(): Observable<City[]> {
    const url = `${this.apiUrl}/City`;
    return this.http.get<City[]>(url).pipe(
      catchError(this.toolsService.handleError<City[]>('getCities', []))
    );
  }

  searchCityByName(search: string): Observable<City[]> {
    const url = `${this.apiUrl}/City/search/${search}`;
    return this.http.get<City[]>(url).pipe(
      catchError((error) => {
        this.toolsService.handleError('searchCityByName', error);
        return throwError(() => error);
      })
    );
  }

  getCityById(cityId: number): Observable<City> {
    const url = `${this.apiUrl}/City/${cityId}`;
    return this.http.get<City>(url).pipe(
      catchError(this.toolsService.handleError<City>('getCityById', {} as City))
    );
  }

  getDepartmentsByRegion(regionId: number): Observable<DepartmentsByRegionResponse> {
    const url = `${this.apiUrl}/Region/${regionId}/departments`;
    return this.http.get<DepartmentsByRegionResponse>(url).pipe(
      catchError(this.toolsService.handleError<DepartmentsByRegionResponse>('getDepartmentsByRegion', {} as DepartmentsByRegionResponse))
    );
  }

  getPresidents(): Observable<President[]> {
    const url = `${this.apiUrl}/President?sortBy=name&sortDirection=asc`;
    return this.http.get<President[]>(url).pipe(
      catchError(this.toolsService.handleError<President[]>('getPresidents', []))
    );
  }

  getPresidentsPaged(page: number, pageSize: number): Observable<PresidentsResp> {
    const url = `${this.apiUrl}/President/pagedList?Page=${page}&PageSize=${pageSize}`;
    return this.http.get<PresidentsResp>(url).pipe(
      catchError(this.toolsService.handleError<PresidentsResp>('getPresidentsPaged', {} as PresidentsResp))
    );
  }

  getAirports(): Observable<Airport[]> {
    const url = `${this.apiUrl}/Airport`;
    return this.http.get<Airport[]>(url).pipe(
      catchError(this.toolsService.handleError<Airport[]>('getAirports', []))
    );
  }

  getAirportsPaged(page: number, pageSize: number): Observable<AirportsPaged> {
    const url = `${this.apiUrl}/Airport/pagedList?Page=${page}&PageSize=${pageSize}`;
    return this.http.get<AirportsPaged>(url).pipe(
      catchError(this.toolsService.handleError<AirportsPaged>('getAirportsPaged', {} as AirportsPaged))
    );
  }

  getArticleById(articleId: number): Observable<ConstitutionArticle> {
    const url = `${this.apiUrl}/ConstitutionArticle/${articleId}`;
    return this.http.get<ConstitutionArticle>(url).pipe(
      catchError(this.toolsService.handleError<ConstitutionArticle>('getArticleById', {} as ConstitutionArticle))
    );
  }

  getRadioStations(): Observable<Radio[]> {
    const url = `${this.apiUrl}/Radio`;
    return this.http.get<Radio[]>(url).pipe(
      catchError(this.toolsService.handleError<Radio[]>('getRadioStations', []))
    );
  }

}
