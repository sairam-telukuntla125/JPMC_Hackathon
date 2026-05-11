import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class StudentDashboardService {

  constructor(
    private http: HttpClient
  ) {}

  getAttendance(studentId:any) {

    return this.http.get(

      `http://localhost:5000/student-dashboard/attendance/${studentId}`

    );

  }

}