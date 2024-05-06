import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ColombiaInfo } from '../interfaces/colombia.interface';
import { Region } from '../interfaces/region.interface';

@Injectable({
  providedIn: 'root',
})
export class ApicolombiaService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getColombiaInfo(): Observable<ColombiaInfo> {
    const url = `${this.apiUrl}/Country/Colombia`;
    return this.http.get<any>(url);
  }

  getRegions(): Observable<any> {
    const url = `${this.apiUrl}/Region`;
    return this.http.get<any>(url);
  }

  getDepartmentsByRegion(regionId: number): Observable<any> {
    const url = `${this.apiUrl}/Region/${regionId}/departments`;
    return this.http.get<any>(url);
  }

}
