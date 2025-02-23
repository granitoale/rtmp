import {ChangeDetectionStrategy, Component, signal, Output, EventEmitter} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-email-input',
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatIconModule, MatButtonModule],
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmailInputComponent {
  readonly email = new FormControl('', [Validators.required, Validators.email]);
  @Output() loginEmail = new EventEmitter<string>();

  errorMessage = signal('');

  constructor() {
    merge(this.email.statusChanges, this.email.valueChanges)
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.loginEmail.emit(this.email.valid ? this.email.value ?? '' : '')),
        tap(() => this.updateErrorMessage())
      )
      .subscribe();
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('Not a valid email');
    } else {
      this.errorMessage.set('');
      this.loginEmail.emit(this.email.value ?? '');
    }
  }
}