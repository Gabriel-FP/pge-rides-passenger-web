import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AuthStore } from './auth.store';
import { AuthApiService } from '../api/auth-api.service';

describe('AuthStore', () => {
  let store: AuthStore;
  let api: jasmine.SpyObj<AuthApiService>;

  const fakeResponse = {
    tokens: { accessToken: 'a', refreshToken: 'r' },
    newUser: true,
  };

  beforeEach(() => {
    localStorage.clear();
    sessionStorage.clear();
    api = jasmine.createSpyObj<AuthApiService>('AuthApiService', ['requestOtp', 'verifyOtp']);
    TestBed.configureTestingModule({
      providers: [{ provide: AuthApiService, useValue: api }],
    });
    store = TestBed.inject(AuthStore);
  });

  it('should start unauthenticated', () => {
    expect(store.isAuthenticated()).toBeFalse();
  });

  it('should hold the pending phone during verification', () => {
    api.requestOtp.and.returnValue(of(undefined));
    store.startVerification('85991234567', true).subscribe();
    expect(store.pendingPhone()).toBe('85991234567');
  });

  it('should authenticate and persist tokens on verified code', fakeAsync(() => {
    api.requestOtp.and.returnValue(of(undefined));
    api.verifyOtp.and.returnValue(of(fakeResponse));
    store.startVerification('85991234567', true).subscribe();
    store.verifyCode('1234').subscribe();
    tick();
    expect(store.isAuthenticated()).toBeTrue();
    expect(localStorage.getItem('pge.auth.tokens')).toContain('a');
  }));

  it('should use sessionStorage when rememberMe is false', fakeAsync(() => {
    api.requestOtp.and.returnValue(of(undefined));
    api.verifyOtp.and.returnValue(of(fakeResponse));
    store.startVerification('85991234567', false).subscribe();
    store.verifyCode('1234').subscribe();
    tick();
    expect(sessionStorage.getItem('pge.auth.tokens')).toContain('a');
    expect(localStorage.getItem('pge.auth.tokens')).toBeNull();
  }));

  it('should clear everything on logout', fakeAsync(() => {
    api.requestOtp.and.returnValue(of(undefined));
    api.verifyOtp.and.returnValue(of(fakeResponse));
    store.startVerification('85991234567', true).subscribe();
    store.verifyCode('1234').subscribe();
    tick();
    store.logout();
    expect(store.isAuthenticated()).toBeFalse();
    expect(localStorage.getItem('pge.auth.tokens')).toBeNull();
  }));
});
