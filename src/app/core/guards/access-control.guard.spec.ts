import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { accessControlGuard } from './access-control.guard';

describe('accessControlGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => accessControlGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
