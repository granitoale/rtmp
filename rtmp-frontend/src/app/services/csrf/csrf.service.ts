import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpXsrfTokenExtractor } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

/**
 * To handle the CSRF (XSRF) token across the App
 */
export class CsrfService {

  public apiUrl = 'https://127.0.0.1:8000';

  constructor(private http: HttpClient, private tokenService: HttpXsrfTokenExtractor){ }

  // Retriveing the XSRF token from the backend
  getCsrfToken(): Observable<any> {
    return this.http.get(`${this.apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });
  }

  // Setting up headers for CSRF Auth
  getHeaders(): HttpHeaders {
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    const token = this.tokenService.getToken();
    if (token)
      headers = headers.set('X-XSRF-TOKEN', token);
    return headers;
  }


}
