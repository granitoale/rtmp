import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CsrfService } from './../csrf/csrf.service';
import { switchMap, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import Echo from 'laravel-echo';
import Pusher from 'pusher-js';
import * as PusherTypes from 'pusher-js';

@Injectable({
  providedIn: 'root'
})

export class LaravelEchoService {

  // To store channels by message ID to unbind and leave them
  private messageChannels: { [key: number]: any } = {};

  constructor(private http: HttpClient, private csrfService: CsrfService, private matSnackBar: MatSnackBar) {
    // Setting up Laravel Echo
    window.Pusher = Pusher;
    window.Echo = new Echo({
      broadcaster: 'reverb', 
      key: 'iur5thwx4qljklienelv', 
      wsHost: '127.0.0.1', 
      wsPort: 8080,
      wssPort: 8080, 
      forceTLS: true,
      enabledTransports: ['ws','wss'],
      authEndpoint: `${this.csrfService.apiUrl}/api/broadcasting/auth`,
      authorizer: (channel: any, options: any): any => {
        return {
          authorize: (socketId: string, callback: (error: boolean, data?: any) => void): void => {
            this.csrfService.getCsrfToken().pipe(
              switchMap(() => {
                return this.http.post<any>(
                  `${this.csrfService.apiUrl}/api/broadcasting/auth`,
                  { socket_id: socketId, channel_name: channel.name },
                  { headers: this.csrfService.getHeaders(), withCredentials: true }
                );
              })
            ).subscribe({
              next: (data: any) => callback(false, data),
              error: (error: any) => {
                console.error('Broadcasting auth error:', error);
                callback(true, error);
              }
            });
          }
        };
      }
    });
  }

  // Listening on a message channel
  listenToMessage(message: MessageResponse){
    this.messageChannels[message.id] = window.Echo.private(`messages.${message.id}`)
      .listen('MessageProcessed', (message:any) => {
        // Notification
        this.matSnackBar.open(`The message "${message.message.body}" has been processed!`,'Close',{
          duration: 3000
        });
        // Leaving the channel (with SPA csrf, need to stop listening first to unbind)
        this.messageChannels[message.message.id].stopListening('MessageProcessed');
        window.Echo.leave(`messages.${message.id}`);
    });
  }

}
