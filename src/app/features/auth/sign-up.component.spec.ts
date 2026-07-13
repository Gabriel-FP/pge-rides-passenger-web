import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { of } from 'rxjs';
import { SignUpComponent } from './sign-up.component';
import { AuthStore } from '../../core/stores/auth.store';

describe('SignUpComponent', () => {
  let authStore: jasmine.SpyObj<AuthStore>;

  beforeEach(async () => {
    authStore = jasmine.createSpyObj<AuthStore>('AuthStore', ['startVerification']);
    authStore.startVerification.and.returnValue(of(undefined));

    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [provideRouter([]), { provide: AuthStore, useValue: authStore }],
    }).compileComponents();
  });

  it('should render the form', () => {
    const fixture = TestBed.createComponent(SignUpComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('form')).toBeTruthy();
  });

  it('should start invalid', () => {
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    expect(component.form.invalid).toBeTrue();
  });

  it('should be valid with a phone and accepted terms', () => {
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', acceptedTerms: true });
    expect(component.form.valid).toBeTrue();
  });

  it('should not start verification while invalid and should surface the errors', () => {
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    component.submit();
    expect(authStore.startVerification).not.toHaveBeenCalled();
    expect(component.form.controls.phone.touched).toBeTrue();
  });

  it('should start verification and go to the otp step on submit', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', acceptedTerms: true });
    component.submit();
    expect(authStore.startVerification).toHaveBeenCalledWith('85991234567', true);
    expect(router.navigate).toHaveBeenCalledWith(['/auth/otp']);
  });
});
