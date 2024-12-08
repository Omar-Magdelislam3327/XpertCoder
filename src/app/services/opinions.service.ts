import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OpinionsService {
  private baseUrl = 'http://xpert.runasp.net/api/Opinions';
  constructor(private http: HttpClient) { }
  getOpinions() {
    return this.http.get<any[]>(this.baseUrl);
  }
  getOpinionById(id: number) {
    return this.http.get<any>(`${this.baseUrl}/${id}`);
  }
  postOpinion(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }
  deleteOpinion(id: number) {
    return this.http.delete(`${this.baseUrl}?opinionId=${id}`, { responseType: 'text' as 'json' });
  }
  updateOpinion(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
}
