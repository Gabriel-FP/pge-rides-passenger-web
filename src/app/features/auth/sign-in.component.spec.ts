import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { SignInComponent } from './sign-in.component';
import { AuthStore } from '../../core/stores/auth.store';

describe('SignInComponent', () => {
  let authStore: jasmine.SpyObj<AuthStore>;

  beforeEach(async () => {
    authStore = jasmine.createSpyObj<AuthStore>('AuthStore', ['startVerification']);
    authStore.startVerification.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [provideRouter([]), { provide: AuthStore, useValue: authStore }],
    }).compileComponents();
  });

  it('should render the form', () => {
    const fixture = TestBed.createComponent(SignInComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should require only a valid phone', () => {
    const component = TestBed.createComponent(SignInComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', rememberMe: false });
    expect(component.form.valid).toBeTrue();
  });

  it('should honor the remember me choice when starting verification', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const component = TestBed.createComponent(SignInComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', rememberMe: false });
    component.submit();
    expect(authStore.startVerification).toHaveBeenCalledWith('85991234567', false);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/otp']);
  });
});
