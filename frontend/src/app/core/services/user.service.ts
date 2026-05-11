import { Injectable }
from '@angular/core';




import {

  HttpClient,

  HttpHeaders

}

from '@angular/common/http';




import {

  Observable

}

from 'rxjs';




import {

  environment

}

from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class UserService {




  apiUrl =
    environment.apiUrl;




  constructor(
    private http: HttpClient
  ) {}




  getMyProfile():
    Observable<any> {




    const token =
      localStorage.getItem(
        'token'
      );




    const headers =
      new HttpHeaders({

        Authorization:
          `Bearer ${token}`

      });




    return this.http.get(

      `${this.apiUrl}/users/me`,

      { headers }

    );

  }

}