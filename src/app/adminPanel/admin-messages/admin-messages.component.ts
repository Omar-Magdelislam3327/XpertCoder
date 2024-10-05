import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MessagesApiService } from 'src/app/services/messages-api.service';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class AdminMessagesComponent {
  messages!: any;
  constructor(private api: MessagesApiService) {
    this.getMessages();
  }
  getMessages() {
    this.api.get().subscribe((data: any) => {
      this.messages = data;
    })
  }
  remove(id: any) {
    this.api.delete(id).subscribe((data: any) => {
      this.getMessages();
    });
  }
}
