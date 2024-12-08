import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private apiUrl = 'http://xpert.runasp.net/api/Account/login';
  constructor(private http: HttpClient, private router: Router) { }
  login(code: string, password: string): Observable<any> {
    return this.http.post<any>(this.apiUrl, { email: code, password }).pipe(
      tap((response: any) => {
        if (response.token) {
          this.loggedIn = true;
          localStorage.setItem('token', response.token);
          this.router.navigate(['/admin/projects']);
        } else {
          this.loggedIn = false;
        }
      })
    );
  }


  logout() {
    this.loggedIn = false;
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
