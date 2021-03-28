import { TestBed } from '@angular/core/testing';

import { ValidaTokenGuard } from './valida-token.guard';

describe('ValidaTokenGuard', () => {
  let guard: ValidaTokenGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ValidaTokenGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
