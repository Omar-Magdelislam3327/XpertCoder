/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Component } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { MessagesApiService } from 'src/app/services/messages-api.service';
import Swal from 'sweetalert2';

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
    this.api.getMessage().subscribe((data: any) => {
      this.messages = data;
    })
  }
  remove(id: number): void {
    Swal.fire({
      title: 'Are you sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00816F',
      cancelButtonColor: '#c4002b',
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        this.api.deleteMessage(id).subscribe(
          () => {
            this.getMessages();
          },
          (error) => {
            Swal.fire({
              title: 'Error!',
              text: 'There was an issue deleting the message.',
              icon: 'error',
              confirmButtonText: 'Retry',
              confirmButtonColor: '#00816F',
            })
          }
        );
      }
    });
  }
  downloadFile(fileUrl: string): void {
    fetch(fileUrl)
      .then(response => response.blob())
      .then(blob => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileUrl.split('/').pop() || 'download';
        a.click();
        window.URL.revokeObjectURL(url);
      })
      .catch(err => console.error('Download failed:', err));
  }
}
