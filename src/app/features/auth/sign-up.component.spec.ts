import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SignUpComponent } from './sign-up.component';

describe('SignUpComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent],
      providers: [provideRouter([])],
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

  it('should not navigate while invalid and should surface the errors', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    component.submit();
    expect(router.navigate).not.toHaveBeenCalled();
    expect(component.form.controls.phone.touched).toBeTrue();
  });

  it('should navigate to the otp step with the phone on submit', () => {
    const router = TestBed.inject(Router);
    spyOn(router, 'navigate');
    const component = TestBed.createComponent(SignUpComponent).componentInstance;
    component.form.setValue({ phone: '85991234567', acceptedTerms: true });
    component.submit();
    expect(router.navigate).toHaveBeenCalledWith(['/auth/otp'], { state: { phone: '85991234567' } });
  });
});
