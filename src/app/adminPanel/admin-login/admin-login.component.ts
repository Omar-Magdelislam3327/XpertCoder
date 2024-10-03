import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
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
