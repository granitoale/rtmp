import { Component } from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatSnackBar} from '@angular/material/snack-bar';
import {AuthService} from './../services/auth/auth.service';
import { merge, tap } from 'rxjs';

@Component({
  selector: 'app-send-message',
  imports: [MatInputModule, MatFormFieldModule, MatButtonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './send-message.component.html',
  styleUrl: './send-message.component.css'
})
export class SendMessageComponent {

  message = new FormControl('');

  constructor(private authService: AuthService, private snackBar: MatSnackBar) {}

  // Sending a message to the server
  sendMessage(): void{
    if (!this.message)
      return;

    this.authService.storeMessage(this.message.value ?? '').subscribe({
      next: (message) => {
        let snackBarRef = this.snackBar.open('Message sent to the server','Close',{
          duration: 3000
        });
        this.message.reset();
      },
      error: (error) => {
        let snackBarRef = this.snackBar.open('Error: Message not sent','Close');
      }
    });
  }

}
