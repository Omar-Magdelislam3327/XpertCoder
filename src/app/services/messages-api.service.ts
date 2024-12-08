/* eslint-disable @typescript-eslint/no-explicit-any */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService {
  private baseUrl = 'http://xpert.runasp.net/api/ContactUs';
  constructor(private http: HttpClient) {
  }
  getMessage() {
    return this.http.get<any[]>(this.baseUrl);
  }
  sendMessage(data: any) {
    return this.http.post<any>(this.baseUrl, data);
  }
  deleteMessage(id: number) {
    return this.http.delete<any>(`${this.baseUrl}?contactUsId=${id}`, { responseType: 'text' as 'json' });
  }
}
