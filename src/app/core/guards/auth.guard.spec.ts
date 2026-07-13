import { TestBed } from '@angular/core/testing';
import { Router, UrlTree } from '@angular/router';
import { authGuard } from './auth.guard';
import { AuthStore } from '../stores/auth.store';

describe('authGuard', () => {
  function run(isAuthenticated: boolean): boolean | UrlTree {
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthStore, useValue: { isAuthenticated: () => isAuthenticated } },
      ],
    });
    return TestBed.runInInjectionContext(() => authGuard({} as never, [] as never)) as boolean | UrlTree;
  }

  it('should allow an authenticated user', () => {
    expect(run(true)).toBeTrue();
  });

  it('should redirect an anonymous user to /auth', () => {
    const result = run(false);
    expect(result instanceof UrlTree).toBeTrue();
    expect(TestBed.inject(Router).serializeUrl(result as UrlTree)).toBe('/auth');
  });
});
