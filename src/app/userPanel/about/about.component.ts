import { ClientsApiService } from './../../services/clients-api.service';
import { Component } from '@angular/core';
import { TeamApiService } from 'src/app/services/team-api.service';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { Meta } from '@angular/platform-browser';

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
  constructor(private teamApi: TeamApiService, private clientApi: ClientsApiService, private meta: Meta) {
    this.teamApi.get().subscribe((data: any) => {
      this.team = data;
    });
    this.clientApi.get().subscribe((data: any) => {
      this.clients = data;
    });
  }
  ngOnInit() {
    this.meta.addTags([
      { name: 'description', content: 'Learn more about XpertCoder, our mission, values, and the team behind top-notch web and mobile solutions.' },
      { name: 'keywords', content: 'about XpertCoder, company, mission, team, values' },
      { name: 'robots', content: 'index, follow' }
    ]);
  }
}
