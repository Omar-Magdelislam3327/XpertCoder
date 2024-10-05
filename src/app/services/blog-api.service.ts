import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Blogs } from '../modules/blogs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BlogApiService extends ApiFunctionService<Blogs> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/blogs", http);
  }
}
