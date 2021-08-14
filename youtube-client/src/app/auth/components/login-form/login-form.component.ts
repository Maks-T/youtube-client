import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { IUser } from '../../models/user.model';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent implements OnInit {
  public email = new FormControl('', [Validators.required, Validators.email]);
  public password = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  public hide = true;
  public form!: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.form = new FormGroup({ email: this.email, password: this.password });
  }

  public getEmailErrorMessage(): string {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

  public getPasswordErrorMessage(): string {
    if (this.password.hasError('required')) {
      return 'You must enter a value';
    }
    return this.password.hasError('password') ? 'Not a valid password' : '';
  }

  public onSubmit(): void {
    if (this.form.valid) {
      const formData: IUser = this.form.value;

      console.log(formData);
    }
  }
}
