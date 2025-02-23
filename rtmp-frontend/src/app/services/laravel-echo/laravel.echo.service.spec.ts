import { TestBed } from '@angular/core/testing';

import { LaravelEchoService } from './laravel.echo.service';

describe('LaravelEchoService', () => {
  let service: LaravelEchoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LaravelEchoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
