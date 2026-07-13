import { TestBed } from '@angular/core/testing';
import { FormControl } from '@angular/forms';
import { OtpInputComponent } from './otp-input.component';

describe('OtpInputComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtpInputComponent],
    }).compileComponents();
  });

  it('should render one input box per digit', () => {
    const fixture = TestBed.createComponent(OtpInputComponent);
    fixture.componentInstance.control = new FormControl('', { nonNullable: true });
    fixture.detectChanges();
    const boxes = (fixture.nativeElement as HTMLElement).querySelectorAll('input');
    expect(boxes.length).toBe(4);
  });
});
