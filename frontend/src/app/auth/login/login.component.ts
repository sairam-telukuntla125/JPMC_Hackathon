import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
        loginData = {

  email: '',

  password: ''

};




constructor(

  private authService: AuthService,

  private router: Router

) {}




login() {

  this.authService.login(
    this.loginData
  )

  .subscribe({

    next: (response) => {

      console.log(response);




      // SAVE TOKEN
      this.authService.saveToken(
        response.token
      );




      // ROLE BASED REDIRECT
      const role =
        response.user.role;




      if (role === 'student') {

        this.router.navigate([
          '/student-dashboard'
        ]);

      }




      else if (
        role === 'volunteer'
      ) {

        this.router.navigate([
          '/volunteer-dashboard'
        ]);

      }




      else if (
        role === 'admin'
      ) {

        this.router.navigate([
          '/admin-dashboard'
        ]);

      }

    },




    error: (error) => {

      console.log(error);

      alert(
        error.error.message
      );

    }

  });

}
}
