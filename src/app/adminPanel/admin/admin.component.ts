import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
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
export class AdminComponent {
  showSidebar: boolean = true;

  constructor(private router: Router) {
    this.router.events.subscribe(() => {
      this.showSidebar = this.router.url !== '/admin/xc-login';
    });
  }
  logOut() {
    localStorage.removeItem('isLoggedIn');
    this.router.navigate(['/xc-login']);
  }
}
