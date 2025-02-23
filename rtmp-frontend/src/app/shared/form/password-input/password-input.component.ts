import {ChangeDetectionStrategy, Component, signal, Output, EventEmitter} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-password-input',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule, FormsModule, ReactiveFormsModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PasswordInputComponent {

  readonly password = new FormControl('', [Validators.required]);
  @Output() loginPassword = new EventEmitter<string>();

  errorMessage = signal('');

  constructor() {
    merge(this.password.statusChanges, this.password.valueChanges)
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.loginPassword.emit(this.password.valid ? this.password.value ?? '' : '')),
        tap(() => this.updateErrorMessage())
      )
      .subscribe();
  }

  updateErrorMessage() {

    if (this.password.hasError('required')) {
      this.errorMessage.set('You must enter a value');
    } else {
      this.errorMessage.set('');
    }
  }

  hide = signal(true);
    clickEvent(event: MouseEvent) {
      this.hide.set(!this.hide());
      event.stopPropagation();
  }
}
