import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthloginService } from '../../../services/authlogin.service';
import { BaseComponent } from '../../../common/base.component';

@Component({
  selector: 'app-login-register',
  standalone: false,
  templateUrl: './loginregister.component.html',
  styleUrl: './loginregister.component.css',
})
export class LoginRegisterComponent extends BaseComponent {
  formErrors: string[] = [];

  myForm = new FormGroup({
    UserName: new FormControl('', Validators.required),
    Password: new FormControl('', Validators.required),
    Role: new FormControl('user', Validators.required),
  });

  constructor(private authService: AuthloginService, private router: Router) {
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

    this.authService.register(this.myForm).subscribe({
      next: (res) => {
        console.log('register product res.status:', res.status);
        if (res.status === 201) {
          this.authService.setInfoLoginSucces(res.body.jwt, res.body.data);
          console.log('Register successfully:res.body:', res.body);
          this.router.navigate(['/home']);
        }
      },
      error: (err) => {
        console.error('Error during registration:', err);
        if (err.status === 404 || err.status === 400) {
          //not found

          this.formErrors.push(
            err.error.message || 'Invalid username or password'
          );
        } else {
          this.formErrors.push(
            err.error?.message || 'An unexpected error occurred'
          );
        }
      },
    });
  }
}
