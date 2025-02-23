import {Component, Output, EventEmitter} from '@angular/core';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {merge} from 'rxjs';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-name-input',
  imports: [MatInputModule, MatFormFieldModule, FormsModule, ReactiveFormsModule],
  templateUrl: './name-input.component.html',
  styleUrl: './name-input.component.css'
})
export class NameInputComponent {

  readonly name = new FormControl('');
  @Output() registerName = new EventEmitter<string>();

  constructor() {
    merge(this.name.statusChanges, this.name.valueChanges)
      .pipe(
        takeUntilDestroyed(),
        tap(() => this.registerName.emit(this.name.value ?? '')),
      )
      .subscribe();
  }

}
