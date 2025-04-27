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
    if (this.myForm.valid) {
      this.formErrors = []; // Clear errors if any
    } else {
      this.formErrors = this.collectFormErrors(this.myForm);

      this.myForm.markAllAsTouched(); // Để highlight các ô lỗi
      return;
    }
    //login
    //update
    this.authService.login(this.myForm).subscribe({
      next: (res) => {
        if (res.status === 200) {
          let user = res.body.data;
          this.authService.setInfoLoginSucces(res.body.jwt, res.body.data);

          if (this.authService.getRedirectUrl() != null) {
            this.router.navigate([this.authService.getRedirectUrl()]);
            this.authService.setRedirectUrl(null); // Reset redirect URL after navigation
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        if (err.status === 404) {
          //not found

          this.formErrors.push('Invalid username or password');
        } else {
          this.formErrors.push(err);
        }
      },
    });
  }
}
