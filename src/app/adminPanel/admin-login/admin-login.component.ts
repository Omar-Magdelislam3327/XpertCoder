import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css'],
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
export class AdminLoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private router: Router) { }

  onLogin() {
    const validUsername = 'amrder@z';
    const validPassword = 'amr2002';

    if (this.username === validUsername && this.password === validPassword) {
      localStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/admin/projects']);
    } else {
      this.errorMessage = 'Invalid username or password!';
    }
  }
}
