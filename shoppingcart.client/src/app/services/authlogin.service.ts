import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Observable } from 'rxjs';
import { LoginResponse } from '../reponses/login.response';
import { LoginResult } from '../reponses/login.result';

@Injectable({
  providedIn: 'root',
})
export class AuthloginService {
  private loggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn.asObservable();
  private redirectUrl: string | null = null;

  constructor(private http: HttpClient) {
    console.log('AuthloginService initialized');
    const token = localStorage.getItem('jwt');
    if (token) {
      // Có thể thêm logic decode token, kiểm tra hạn dùng v.v nếu muốn
      this.loggedIn.next(true);
    } else {
      this.loggedIn.next(false);
    }

    console.log('isLoggedIn$:', this.isLoggedIn$);
  }

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
   * Login
   * @param formData Form data sent to the server, with 'userName' and 'password' fields.
   * @returns An observable of the server response, with the response body containing the JWT token.
   */
  /*******  8c19aa04-e0e7-4d27-b4fa-6d4260ea7470  *******/
  //login(formGroup: FormGroup): Observable<HttpResponse<any>> {
  // login(formGroup: FormGroup): Observable<LoginResult> {
  //   this.http
  //     .post<LoginResponse>('/api/login/login', formGroup, {
  //       observe: 'response',
  //     })
  //     .subscribe((res) => {
  //       console.log('Login response:', res);
  //       if (res.status === 200) {
  //         const token = res?.body?.jwt || '';
  //         this.loggedIn.next(true); // Update the loggedIn status
  //         localStorage.setItem('jwt', token); // Store the token in local storage
  //         return { success: true };
  //       }
  //     });

  //   return false;
  // }
  login(formGroup: FormGroup): Observable<any> {
    return this.http.post<LoginResponse>('/api/login/login', formGroup.value, {
      observe: 'response',
    });
  }

  logout() {
    this.loggedIn.next(false); // Update the loggedIn status

    // Check if the token exists in local storage
    const token = localStorage.getItem('jwt');
    if (token) {
      // If it exists, remove it from local storage
      localStorage.removeItem('jwt');
    }

    // localStorage.removeItem('jwt'); // Store the token in local storage
  }
  setInfoLoginSucces(jwt: string) {
    this.loggedIn.next(true); // Update the loggedIn status
    localStorage.setItem('jwt', jwt); // Store the token in local storage
  }

  isLoggedInNow(): boolean {
    console.log('isLoggedInNow called');
    console.log('isLoggedIn:', this.loggedIn.value);
    return this.loggedIn.value;
  }
  setRedirectUrl(url: string | null) {
    this.redirectUrl = url;
  }
  getRedirectUrl() {
    return this.redirectUrl;
  }
}
