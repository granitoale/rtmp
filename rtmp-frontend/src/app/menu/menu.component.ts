import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AuthService } from './../services/auth/auth.service';

@Component({
  selector: 'app-menu',
  imports: [MatToolbarModule, MatButtonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {

  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {
    // Subscribe to the authStatus$ observable to track authentication status
    this.authService.authStatus$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  logout(): void{
    this.authService.logout().subscribe({
      error: (error) => {
        let snackBarRef = this.snackBar.open('Error Logging out','Close');
      }
    });

  }

}
