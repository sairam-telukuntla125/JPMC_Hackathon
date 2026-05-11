import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from '../../../environments/environment';




@Injectable({
  providedIn: 'root'
})

export class EventService {

  apiUrl =
    environment.apiUrl;




  constructor(
    private http: HttpClient
  ) {}




  // GET ALL EVENTS
  getAllEvents():
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/events`

    );

  }




  // GET SINGLE EVENT
  getEventById(id: string):
    Observable<any> {

    return this.http.get(

      `${this.apiUrl}/events/${id}`

    );

  }




  // REGISTER FOR EVENT
  registerForEvent(
    eventId: string,
    token: string
  ): Observable<any> {

    return this.http.post(

      `${this.apiUrl}/registrations/${eventId}`,

      {},

      {

        headers: {

          Authorization:
            `Bearer ${token}`

        }

      }

    );

  }

}