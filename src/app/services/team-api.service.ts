import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Team } from '../modules/team';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TeamApiService extends ApiFunctionService<Team> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/team", http)
  }
}
