import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class AuthService {

  apiUrl =
    environment.apiUrl;




  constructor(
    private http: HttpClient
  ) {}




  // REGISTER
  register(userData: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/auth/register`,

      userData

    );

  }




  // LOGIN
  login(userData: any): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/auth/login`,

      userData

    );

  }

  // SAVE TOKEN
  saveToken(token: string) {

    localStorage.setItem(
      'token',
      token
    );

  }

  // GET TOKEN
  getToken() {

    return localStorage.getItem(
      'token'
    );

  }

  // LOGOUT
  logout() {

    localStorage.removeItem(
      'token'
    );

  }

}