import {Component, ViewChild} from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {EmailInputComponent} from './../shared/form/email-input/email-input.component';
import {PasswordInputComponent} from './../shared/form/password-input/password-input.component';
import {NameInputComponent} from './../shared/form/name-input/name-input.component';
import {AuthService} from './../services/auth/auth.service';

@Component({
  selector: 'app-register',
  imports: [MatButtonModule, MatIconModule ,MatFormFieldModule, EmailInputComponent, PasswordInputComponent, NameInputComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

  @ViewChild(NameInputComponent) nameInput!: NameInputComponent;
  @ViewChild(EmailInputComponent) emailInput!: EmailInputComponent;
  @ViewChild(PasswordInputComponent) passwordInput!: PasswordInputComponent;

  name: string = '';
  email: string = '';
  password: string = '';

  constructor (private authService: AuthService, private snackBar: MatSnackBar){}
  
  onNameChange(name: string): void {
    this.name = name;
  }

  onEmailChange(email: string): void {
    this.email = email;
  }

  onPasswordChange(password: string): void {
    this.password = password;
  }

  register(): void{
    if (!this.email || !this.password || !this.name)
      return;
    
    this.authService.register(this.name, this.email, this.password).subscribe({
      next: (response) => {
        console.log('Register successful!', response);
      },
      error: (error) => {
        let snackBarRef = this.snackBar.open(error.error.message,'Close');
      }
    });
  }

}
