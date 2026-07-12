import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { OnboardingComponent } from './onboarding.component';
import { OnboardingService } from '../../core/services/onboarding.service';

describe('OnboardingComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OnboardingComponent],
      providers: [provideRouter([])],
    }).compileComponents();
  });

  it('should start on the first slide', () => {
    const fixture = TestBed.createComponent(OnboardingComponent);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('h1')?.textContent).toContain('Welcome to PGE-Rides');
  });

  it('should advance to the next slide on continue', () => {
    const component = TestBed.createComponent(OnboardingComponent).componentInstance;
    component.next();
    expect(component.currentIndex()).toBe(1);
  });

  it('should mark as seen and go to the app when finishing the last slide', () => {
    const onboardingService = TestBed.inject(OnboardingService);
    const router = TestBed.inject(Router);
    spyOn(onboardingService, 'markAsSeen');
    spyOn(router, 'navigateByUrl');
    const component = TestBed.createComponent(OnboardingComponent).componentInstance;
    component.next();
    component.next();
    component.next();
    expect(onboardingService.markAsSeen).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app', { replaceUrl: true });
  });

  it('should mark as seen and go to the app on skip', () => {
    const onboardingService = TestBed.inject(OnboardingService);
    const router = TestBed.inject(Router);
    spyOn(onboardingService, 'markAsSeen');
    spyOn(router, 'navigateByUrl');
    const component = TestBed.createComponent(OnboardingComponent).componentInstance;
    component.skip();
    expect(onboardingService.markAsSeen).toHaveBeenCalled();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app', { replaceUrl: true });
  });
});
