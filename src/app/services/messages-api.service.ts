import { Injectable } from '@angular/core';
import { ApiFunctionService } from './api-function.service';
import { Messages } from '../modules/message';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MessagesApiService extends ApiFunctionService<Messages> {

  constructor(protected override http: HttpClient) {
    super("http://localhost:3000/contacts", http)
  }
}
