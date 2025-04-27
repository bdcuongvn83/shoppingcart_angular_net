import { FormGroup } from '@angular/forms';

export class BaseComponent {
  sayHello() {
    // console.log('say something');
  }

  protected log(msg: string) {
    console.log('[Log]:', msg);
  }

  protected collectFormErrors(formGroup: FormGroup): string[] {
    const errors: string[] = [];

    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup.get(key);
      if (control && control.invalid && control.errors) {
        Object.keys(control.errors).forEach((errorKey) => {
          let errorMessage = '';

          switch (errorKey) {
            case 'required':
              errorMessage = `${key} is required.`;
              break;
            case 'minlength':
              errorMessage = `${key} must be at least ${
                control.errors![errorKey].requiredLength
              } characters.`;
              break;
            case 'maxlength':
              errorMessage = `${key} must be at most ${
                control.errors![errorKey].requiredLength
              } characters.`;
              break;
            case 'email':
              errorMessage = `${key} must be a valid email.`;
              break;
            default:
              errorMessage = `${key} is invalid.`;
          }

          errors.push(errorMessage);
        });
      }
    });

    return errors;
  }
}
