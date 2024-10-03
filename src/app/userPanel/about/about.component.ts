import { ClientsApiService } from './../../services/clients-api.service';
import { Component } from '@angular/core';
import { TeamApiService } from 'src/app/services/team-api.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
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
