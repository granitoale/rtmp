import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject, Observable, switchMap, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { CsrfService } from './../csrf/csrf.service';
import { LaravelEchoService } from './../laravel-echo/laravel.echo.service';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  private isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus$ = this.isAuthenticated.asObservable();

  constructor(private http: HttpClient, private csrfService: CsrfService, private laravelEchoService: LaravelEchoService, private router: Router) {
    this.checkAuthStatus();
  }

  // Check auth status
  private checkAuthStatus() {
    this.http.get(`${this.csrfService.apiUrl}/api/user`,{ headers: this.csrfService.getHeaders(),withCredentials: true }).pipe(
      tap(() => {
        this.isAuthenticated.next(true);
        this.getPendingMessages().subscribe();
        this.router.navigate(['']);
      }),
      catchError(() => {
        this.isAuthenticated.next(false);
        return[];
      })
    ).subscribe();
  }

  // Login request
  login(email: string, password: string): Observable<any> {
    return this.csrfService.getCsrfToken().pipe(
      switchMap(() => {
        return this.http.post(
          `${this.csrfService.apiUrl}/api/login`,
          { email, password },
          { headers: this.csrfService.getHeaders(),withCredentials: true }
        ).pipe(
          tap(
            () => {
              this.isAuthenticated.next(true);
              this.getPendingMessages().subscribe();
              this.router.navigate(['send-message']);
            }
          )
        );
      })
    );
  }

  // Register request
  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(
      `${this.csrfService.apiUrl}/api/register`,
      { name, email, password },
      { headers: this.csrfService.getHeaders(),withCredentials: true }
    ).pipe(
      tap(
        () => {
          this.router.navigate(['/login']);
        }
      )
    );
  }

  // Logout
  logout(): Observable<any> {
    return this.http.post(
      `${this.csrfService.apiUrl}/api/logout`,
      {},
      { headers: this.csrfService.getHeaders(),withCredentials: true }
    ).pipe(
      tap(
        () => {
          this.isAuthenticated.next(false);
          this.router.navigate(['']);
        }
      )
    );
  }

  // Sending a message
  storeMessage(message: string): Observable<MessageResponse> {
    return this.http.post<MessageResponse>(
      `${this.csrfService.apiUrl}/api/message/store`,
      { body: message },
      { headers: this.csrfService.getHeaders(),withCredentials: true }
    ).pipe(
      tap(
        (message) => {
          this.laravelEchoService.listenToMessage(message);
        }
      ),
      catchError((error: HttpErrorResponse) => {
        return throwError('Error');
      })
    );
  }

  // Getting pending messages
  getPendingMessages(): Observable<any> {
    return this.http.get<any>(
      `${this.csrfService.apiUrl}/api/message/pending-messages`,
      { headers: this.csrfService.getHeaders(),withCredentials: true }
    ).pipe(
      tap(pendingMessages => {
        // Start listening for each pending message
        Object.values(pendingMessages).forEach((pendingMessage:any) => {
          this.laravelEchoService.listenToMessage(pendingMessage);
        });
      }),
      catchError((error: HttpErrorResponse) => {
        return throwError('Error');
      })
    );
  }

}
