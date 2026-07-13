import { TestBed } from '@angular/core/testing';
import { FormControl, Validators } from '@angular/forms';
import { PhoneInputComponent } from './phone-input.component';

describe('PhoneInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PhoneInputComponent],
    }).compileComponents();
  });

  function create(control: FormControl<string>) {
    const fixture = TestBed.createComponent(PhoneInputComponent);
    fixture.componentInstance.control = control;
    fixture.detectChanges();
    return fixture;
  }

  it('should not show errors while untouched', () => {
    const fixture = create(new FormControl('', { nonNullable: true, validators: [Validators.required] }));
    expect(fixture.nativeElement.querySelector('.phone-input__error')).toBeNull();
  });

  it('should show the required error after touch', () => {
    const control = new FormControl('', { nonNullable: true, validators: [Validators.required] });
    const fixture = create(control);
    control.markAsTouched();
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.phone-input__error')?.textContent).toContain('required');
  });
});
