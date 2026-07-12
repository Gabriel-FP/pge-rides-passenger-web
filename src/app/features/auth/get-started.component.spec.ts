import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { GetStartedComponent } from './get-started.component';

describe('GetStartedComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GetStartedComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should render one button per social provider', () => {
    const fixture = TestBed.createComponent(GetStartedComponent);
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll('.get-started__social-button');
    expect(buttons.length).toBe(4);
  });

  it('should disable unavailable social providers', () => {
    const fixture = TestBed.createComponent(GetStartedComponent);
    fixture.detectChanges();
    const disabled = (fixture.nativeElement as HTMLElement).querySelectorAll('.get-started__social-button:disabled');
    expect(disabled.length).toBe(3);
  });
});
