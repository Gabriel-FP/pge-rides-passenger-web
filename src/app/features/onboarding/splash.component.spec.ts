import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { SplashComponent } from './splash.component';
import { OnboardingService } from '../../core/services/onboarding.service';

describe('SplashComponent', () => {
  let router: Router;
  let onboardingService: OnboardingService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SplashComponent],
      providers: [provideRouter([])],
    }).compileComponents();

    router = TestBed.inject(Router);
    onboardingService = TestBed.inject(OnboardingService);
    spyOn(router, 'navigateByUrl');
  });

  it('should go to onboarding on first visit', fakeAsync(() => {
    spyOn(onboardingService, 'hasSeenOnboarding').and.returnValue(false);
    TestBed.createComponent(SplashComponent).detectChanges();
    tick(1500);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/onboarding', { replaceUrl: true });
  }));

  it('should go straight to the app when onboarding was already seen', fakeAsync(() => {
    spyOn(onboardingService, 'hasSeenOnboarding').and.returnValue(true);
    TestBed.createComponent(SplashComponent).detectChanges();
    tick(1500);
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app', { replaceUrl: true });
  }));
});
