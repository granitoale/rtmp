import {Component, ViewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmailInputComponent} from './../shared/form/email-input/email-input.component';
import {PasswordInputComponent} from './../shared/form/password-input/password-input.component';
import {AuthService} from './../services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [MatButtonModule, MatIconModule ,MatFormFieldModule, EmailInputComponent, PasswordInputComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {

  @ViewChild(EmailInputComponent) emailInput!: EmailInputComponent;
  @ViewChild(PasswordInputComponent) passwordInput!: PasswordInputComponent;

  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  onEmailChange(email: string): void {
    this.email = email;
  }

  onPasswordChange(password: string): void {
    this.password = password;
  }

  login(): void{

    if (!this.email || !this.password)
      return;

    this.authService.login(this.email, this.password).subscribe({
      error: (error) => {
        let snackBarRef = this.snackBar.open('Invalid credentials','Close');
      }
    });

  }

}
