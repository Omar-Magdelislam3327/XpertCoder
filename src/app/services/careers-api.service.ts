import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Careers } from '../modules/careers';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CareersApiService extends ApiFunctionService<Careers> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/careers", http)
  }
}
