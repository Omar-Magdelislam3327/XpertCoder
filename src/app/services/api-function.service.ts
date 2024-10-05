import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiFunctionService<T> {
  constructor(@Inject(String) public url: string, protected http: HttpClient) { }

  // Fetch all (returns array of T)
  get(): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  // Fetch by ID (returns a single item of T)
  getById(id: any): Observable<T> {
    return this.http.get<T>(this.url + `/${id}`);
  }

  // Post
  post(obj: any): Observable<T> {
    return this.http.post<T>(this.url, obj);
  }

  // Put
  put(id: any, obj: any): Observable<T> {
    return this.http.put<T>(this.url + `/${id}`, obj);
  }

  // Delete
  delete(id: any): Observable<T> {
    return this.http.delete<T>(this.url + `/${id}`);
  }
}
