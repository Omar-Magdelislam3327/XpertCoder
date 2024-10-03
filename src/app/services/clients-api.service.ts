import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Clients } from '../modules/clients';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService extends ApiFunctionService<Clients> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/clients", http)
  }
}
