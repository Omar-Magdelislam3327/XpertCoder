import { ClientsApiService } from './../../services/clients-api.service';
import { Component } from '@angular/core';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
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
export class AboutComponent {
  team!: any;
  clients!: any;
  constructor(private teamApi: TeamApiService, private clientApi: ClientsApiService) {
    this.teamApi.get().subscribe((data: any) => {
      this.team = data;
    });
    this.clientApi.get().subscribe((data: any) => {
      this.clients = data;
    });
  }
}
