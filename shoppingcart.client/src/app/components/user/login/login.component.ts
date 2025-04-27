import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BaseComponent } from '../../../common/base.component';
import { AuthloginService } from '../../../services/authlogin.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent extends BaseComponent {
  formErrors: string[] = [];

  myForm = new FormGroup({
    UserName: new FormControl('', Validators.required),

    Password: new FormControl('', Validators.required),
  });

  /*************  ✨ Windsurf Command ⭐  *************/
  /**
 * Initializes a new instance of the LoginComponent class.
 * @param authService - The authentication service used for login operations.

/*******  520c593b-9378-4c7e-9536-33b2e9cc9426  *******/ constructor(
    private authService: AuthloginService,
    private router: Router
  ) {
    super();
  }

  handleSubmitForm() {
    //console.log('handleSubmitForm called');
    // console.log(this.myForm.value);
    if (this.myForm.valid) {
      // console.log('Form submitted:', this.myForm.value);
      this.formErrors = []; // Clear errors if any
    } else {
      this.formErrors = this.collectFormErrors(this.myForm);
      // console.log('Form errors:', this.formErrors);
      this.myForm.markAllAsTouched(); // Để highlight các ô lỗi
      return;
    }
    //login
    //update
    this.authService.login(this.myForm).subscribe({
      next: (res) => {
        //   console.log('Update product:', res);
        //  console.log('Update product res.status:', res.status);
        if (res.status === 200) {
          // console.log(
          //   `Login current status isLoggedInNow:${this.authService.isLoggedInNow()}`
          // );
          // console.log('Login current res.body.data', res.body.data);
          let user = res.body.data;
          this.authService.setInfoLoginSucces(res.body.jwt, res.body.data);

          // console.log('Login successfully:');
          // console.log(
          //   `Login current status isLoggedInNow:${this.authService.isLoggedInNow()}`
          // );

          // console.log('Update  successfully:', res);
          if (this.authService.getRedirectUrl() != null) {
            this.router.navigate([this.authService.getRedirectUrl()]);
            this.authService.setRedirectUrl(null); // Reset redirect URL after navigation
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        // console.error('Error during registration:', err);
        if (err.status === 404) {
          //not found
          // console.error('Invalid username or password');
          this.formErrors.push('Invalid username or password');
        } else {
          // console.error('An error occurred:', err);
          this.formErrors.push(err);
        }
      },
    });
  }
}
