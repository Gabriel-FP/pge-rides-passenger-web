import { Injectable } from '@angular/core';

const ONBOARDING_SEEN_KEY = 'pge.onboardingSeen';

@Injectable({ providedIn: 'root' })
export class OnboardingService {
  hasSeenOnboarding(): boolean {
    return localStorage.getItem(ONBOARDING_SEEN_KEY) === 'true';
  }

  markAsSeen(): void {
    localStorage.setItem(ONBOARDING_SEEN_KEY, 'true');
  }
}
