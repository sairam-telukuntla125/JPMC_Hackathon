import { Component, OnInit } from '@angular/core';

import { EventService }
from '../../core/services/event.service';




@Component({
  selector: 'app-event-list',
  templateUrl:
    './event-list.component.html',
  styleUrls:
    ['./event-list.component.css']
})

export class EventListComponent
implements OnInit {




  events: any[] = [];




  constructor(

    private eventService:
      EventService

  ) {}




  ngOnInit(): void {

    this.getEvents();

  }




  getEvents() {

    this.eventService
    .getAllEvents()

    .subscribe({

      next: (response) => {

        console.log(response);




        this.events =
          response.events;

      },




      error: (error) => {

        console.log(error);

      }

    });

  }

}
