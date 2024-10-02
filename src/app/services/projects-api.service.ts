import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Projects } from '../modules/projects';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProjectsApiService extends ApiFunctionService<Projects> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/projects", http)
  }
}
