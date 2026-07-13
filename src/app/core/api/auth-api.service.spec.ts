import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AuthApiService } from './auth-api.service';
import { OtpVerifyResponse } from '../models/auth.model';

describe('AuthApiService', () => {
  let service: AuthApiService;

  beforeEach(() => {
    localStorage.clear();
    spyOn(console, 'info');
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthApiService);
  });

  function requestAndCaptureCode(phone: string): string {
    service.requestOtp(phone).subscribe();
    tick(600);
    const logged = (console.info as jasmine.Spy).calls.mostRecent().args[0] as string;
    return logged.slice(-4);
  }

  it('should verify a correct code and flag an unknown phone as new user', fakeAsync(() => {
    const code = requestAndCaptureCode('85991234567');
    let response: OtpVerifyResponse | undefined;
    service.verifyOtp('85991234567', code).subscribe((r) => (response = r));
    tick(600);
    expect(response?.tokens.accessToken).toBeTruthy();
    expect(response?.newUser).toBeTrue();
  }));

  it('should not flag a known phone as new user', fakeAsync(() => {
    service.markPhoneAsKnown('85991234567');
    const code = requestAndCaptureCode('85991234567');
    let response: OtpVerifyResponse | undefined;
    service.verifyOtp('85991234567', code).subscribe((r) => (response = r));
    tick(600);
    expect(response?.newUser).toBeFalse();
  }));

  it('should reject a wrong code', fakeAsync(() => {
    requestAndCaptureCode('85991234567');
    let error: Error | undefined;
    service.verifyOtp('85991234567', '0000').subscribe({ error: (e) => (error = e) });
    tick(600);
    expect(error?.message).toBe('INVALID_OTP');
  }));
});
