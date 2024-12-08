/* eslint-disable @typescript-eslint/no-inferrable-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { Blogs } from '../modules/blogs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService {

  private baseUrl = 'http://xpert.runasp.net/api/Blogs';

  constructor(private http: HttpClient) {
  }
  getBlogs(
    pageIndex: number = 1,
    pageSize: number = 12
  ): Observable<any> {
    return this.http.get<any>(
      `${this.baseUrl}?pageIndex=${pageIndex}&pageSize=${pageSize}`
    );
  }
  getBlogByType(type: any): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/type?type=${type}`);
  }
  getBlogById(id: number): Observable<Blogs> {
    return this.http.get<Blogs>(`${this.baseUrl}/${id}`);
  }
  postBlog(blog: any) {
    return this.http.post(`${this.baseUrl}`, blog);
  }
  putBlog(blogId: any, formData: FormData) {
    return this.http.put(`${this.baseUrl}/${blogId}`, formData);
  }
  deleteBlog(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}?blogId=${id}`, { responseType: 'text' as 'json' });
  }
}
