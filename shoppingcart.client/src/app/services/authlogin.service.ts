import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../reponses/login.response';

import { LoginUser } from '../data/loginUser.data';

@Injectable({
  providedIn: 'root',
})
export class AuthloginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();

  private userLogin = new BehaviorSubject<LoginUser | null>(null);
  userLogin$ = this.userLogin.asObservable();

  private redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
    const token = localStorage.getItem('jwt');
    if (token) {
      // Có thể thêm logic decode token, kiểm tra hạn dùng v.v nếu muốn
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    const user = localStorage.getItem('userLogin');

    if (user) {
      this.userLogin.next(JSON.parse(user));
    } else {
      this.userLogin.next(null);
    }
  }

  register(formGroup: FormGroup): Observable<any> {
    return this.http.post<LoginResponse>('/api/login/', formGroup.value, {
      observe: 'response',
    });
  }

  login(formGroup: FormGroup): Observable<any> {
    return this.http.post<LoginResponse>('/api/login/login', formGroup.value, {
      observe: 'response',
    });
  }

  logout() {
    this.loggedIn.next(false); // Update the loggedIn status
    this.userLogin.next(null); // Update the loggedIn status
    // Check if the token exists in local storage
    const token = localStorage.getItem('jwt');
    if (token) {
      // If it exists, remove it from local storage
      localStorage.removeItem('jwt');
    }
    localStorage.removeItem('userLogin'); // Remove the userLogin from local storage

    // localStorage.removeItem('jwt'); // Store the token in local storage
  }
  setInfoLoginSucces(jwt: string, item?: LoginUser) {
    this.loggedIn.next(true); // Update the loggedIn status
    localStorage.setItem('jwt', jwt); // Store the token in local storage

    localStorage.setItem('userLogin', JSON.stringify(item)); // Store the token in local storage
    this.userLogin.next(item || null); // Update the userLogin status
  }

  isLoggedInNow(): boolean {
    return this.loggedIn.value;
  }
  setRedirectUrl(url: string | null) {
    this.redirectUrl = url;
  }
  getRedirectUrl() {
    return this.redirectUrl;
  }
}
