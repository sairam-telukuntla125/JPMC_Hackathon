import {
  Component,
  OnInit
} from '@angular/core';

import {
  UserService
} from '../../core/services/user.service';

import {
  StudentDashboardService
} from '../../core/services/student-dashboard.service';

@Component({
  selector: 'app-student-dashboard',

  templateUrl:
    './student-dashboard.component.html',

  styleUrls:
    ['./student-dashboard.component.css']
})

export class StudentDashboardComponent
implements OnInit {

  user:any;

  attendanceData:any;

  constructor(

    private userService:
      UserService,

    private dashboardService:
      StudentDashboardService

  ) {}
  
ngOnInit(): void {

  this.getProfile();

}

 getProfile() {

  this.userService
    .getMyProfile()

    .subscribe({

      next: (response:any) => {

        console.log(response);

        this.user = response;

        // CALL ATTENDANCE USING LOGGED USER ID

        this.getAttendance(
          response._id
        );

      },

      error: (error:any) => {

        console.log(error);

      }

    });

}
  getAttendance(studentId:any) {

  this.dashboardService
    .getAttendance(studentId)

    .subscribe({

      next: (response:any) => {

        console.log(response);

        this.attendanceData =
        response;

      },

      error: (error:any) => {

        console.log(error);

      }

    });


  }

}