import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent {
  showSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSidebar = this.router.url !== '/admin/xc-login';
    });
  }
}
