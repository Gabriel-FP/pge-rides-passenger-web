import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignInComponent],
      providers: [provideRouter([])],
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

  it('should navigate to the otp step with the phone on submit', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const component = TestBed.createComponent(SignInComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', rememberMe: true });
    component.submit();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/otp'], { state: { phone: '85991234567' } });
  });
});
