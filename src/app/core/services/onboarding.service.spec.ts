import { TestBed } from '@angular/core/testing';
import { OnboardingService } from './onboarding.service';

describe('OnboardingService', () => {
  let service: OnboardingService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(OnboardingService);
  });

  it('should report not seen by default', () => {
    expect(service.hasSeenOnboarding()).toBeFalse();
  });

  it('should report seen after markAsSeen', () => {
    service.markAsSeen();
    expect(service.hasSeenOnboarding()).toBeTrue();
  });
});
