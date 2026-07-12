import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../core/services/onboarding.service';

const SPLASH_DURATION_MS = 1500;

@Component({
  selector: 'app-splash',
  standalone: true,
  templateUrl: './splash.component.html',
  styleUrl: './splash.component.scss',
})
export class SplashComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly onboardingService = inject(OnboardingService);
  private timeoutId?: number;

  ngOnInit(): void {
    this.timeoutId = window.setTimeout(() => {
      const target = this.onboardingService.hasSeenOnboarding() ? '/app' : '/onboarding';
      this.router.navigateByUrl(target, { replaceUrl: true });
    }, SPLASH_DURATION_MS);
  }

  ngOnDestroy(): void {
    window.clearTimeout(this.timeoutId);
  }
}
