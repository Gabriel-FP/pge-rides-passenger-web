import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { signal } from '@angular/core';
import { provideRouter, Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { OtpComponent } from './otp.component';
import { AuthStore } from '../../core/stores/auth.store';

describe('OtpComponent', () => {
  const pendingPhone = signal<string | null>('85991234567');
  let authStore: { pendingPhone: typeof pendingPhone; verifyCode: jasmine.Spy; resendCode: jasmine.Spy };
  let router: Router;

  beforeEach(async () => {
    pendingPhone.set('85991234567');
    authStore = {
      pendingPhone,
      verifyCode: jasmine.createSpy('verifyCode'),
      resendCode: jasmine.createSpy('resendCode'),
    };

    await TestBed.configureTestingModule({
      imports: [OtpComponent],
      providers: [provideRouter([]), { provide: AuthStore, useValue: authStore }],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should redirect to auth when there is no verification in progress', () => {
    pendingPhone.set(null);
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth', { replaceUrl: true });
  });

  it('should show the masked phone', () => {
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('+55 (85) •••••-4567');
  });

  it('should auto-submit when the fourth digit arrives', () => {
    authStore.verifyCode.and.returnValue(of({ tokens: { accessToken: 'a', refreshToken: 'r' }, newUser: false }));
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    fixture.componentInstance.codeControl.setValue('1234');
    expect(authStore.verifyCode).toHaveBeenCalledWith('1234');
  });

  it('should send a new user to complete the profile', () => {
    authStore.verifyCode.and.returnValue(of({ tokens: { accessToken: 'a', refreshToken: 'r' }, newUser: true }));
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    fixture.componentInstance.codeControl.setValue('1234');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/auth/complete-profile', { replaceUrl: true });
  });

  it('should send a returning user straight to the app', () => {
    authStore.verifyCode.and.returnValue(of({ tokens: { accessToken: 'a', refreshToken: 'r' }, newUser: false }));
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    fixture.componentInstance.codeControl.setValue('1234');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app', { replaceUrl: true });
  });

  it('should surface the error and clear the code on a wrong code', () => {
    authStore.verifyCode.and.returnValue(throwError(() => new Error('INVALID_OTP')));
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    fixture.componentInstance.codeControl.setValue('0000');
    fixture.detectChanges();
    expect(fixture.componentInstance.verifyError()).toContain('Invalid code');
    expect(fixture.componentInstance.codeControl.value).toBe('');
  });

  it('should enable resend after the cooldown', fakeAsync(() => {
    authStore.resendCode.and.returnValue(of(undefined));
    const fixture = TestBed.createComponent(OtpComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.canResend()).toBeFalse();
    tick(60000);
    expect(fixture.componentInstance.canResend()).toBeTrue();
    fixture.componentInstance.resend();
    expect(authStore.resendCode).toHaveBeenCalled();
    expect(fixture.componentInstance.canResend()).toBeFalse();
    fixture.destroy();
  }));
});
