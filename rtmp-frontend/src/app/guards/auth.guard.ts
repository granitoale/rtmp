import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './../services/auth/auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // Redirect to login if not authenticated
  canActivate(): Observable<boolean> {
    return this.authService.authStatus$.pipe(
      map(isAuthenticated => {
        if (!isAuthenticated) {
          this.router.navigate(['login']);
          return false;
        }
        return true;
      })
    );
  }
}
