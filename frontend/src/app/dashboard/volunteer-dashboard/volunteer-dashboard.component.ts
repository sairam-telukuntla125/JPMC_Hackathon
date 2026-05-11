import {

  Component,

  OnInit

}

from '@angular/core';




import {

  AssignmentService

}

from '../../core/services/assignment.service';




@Component({
  selector:
    'app-volunteer-dashboard',

  templateUrl:
    './volunteer-dashboard.component.html',

  styleUrls:
    ['./volunteer-dashboard.component.css']
})




export class VolunteerDashboardComponent
implements OnInit {

  assignments: any[] = [];
  selectedStudents: any[] = [];
  constructor(

    private assignmentService:AssignmentService

  ) {}




  ngOnInit(): void {

    this.getAssignments();

  }




  getAssignments() {

    this.assignmentService
    .getMyAssignments()

    .subscribe({

      next: (response) => {

        console.log(response);




        this.assignments =
          response.assignments;

      },




      error: (error) => {

        console.log(error);

      }

    });

  }

  viewStudents(
  eventId: string
) {

  this.assignmentService
  .getEventStudents(eventId)

  .subscribe({

    next: (response) => {

      console.log(response);




      this.selectedStudents =
        response.students;

    },




    error: (error) => {

      console.log(error);

    }

  });

}

}
