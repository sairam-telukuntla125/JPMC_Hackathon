import { Component } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerData = {

  name: '',

  email: '',

  password: '',

  role: 'student'

};




constructor(

  private authService: AuthService,

  private router: Router

) {}




register() {

  this.authService.register(
    this.registerData
  )

  .subscribe({

    next: (response) => {

      console.log(response);




      alert(
        'Registration successful'
      );




      this.router.navigate([
        '/login'
      ]);

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
