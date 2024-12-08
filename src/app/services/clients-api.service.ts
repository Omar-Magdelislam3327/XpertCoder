/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private baseUrl = 'http://xpert.runasp.net/api/Clients';
  constructor(private http: HttpClient) {
  }
  getClients() {
    return this.http.get(this.baseUrl);
  }
  getClientById(id: any) {
    return this.http.get(`${this.baseUrl}/GetClientById/${id}`);
  }
  CreateClient(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  UpdateClient(id: number, data: any) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }
  DeleteClient(id: number) {
    return this.http.delete(`${this.baseUrl}?clientId=${id}`, { responseType: 'text' as 'json' });
  }
  getCountries() {
    return this.http.get('http://xpert.runasp.net/api/Countries');
  }
}
