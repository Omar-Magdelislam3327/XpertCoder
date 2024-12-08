import { Injectable } from '@angular/core';
import { Careers } from '../modules/careers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareersApiService {
  private baseUrl = 'http://xpert.runasp.net/api/JoinUs';
  constructor(private http: HttpClient) {
  }
  getCarrers() {
    return this.http.get<Careers[]>(this.baseUrl);
  }
  postCareers(data: any) {
    return this.http.post<Careers>(this.baseUrl, data);
  }
  deleteCareers(id: number) {
    return this.http.delete(`${this.baseUrl}?joinUsId=${id}`, { responseType: 'text' as 'json' });
  }
}
