import { Component, computed, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { OnboardingService } from '../../core/services/onboarding.service';

interface OnboardingSlide {
  icon: string;
  title: string;
  text: string;
}

@Component({
  selector: 'app-onboarding',
  standalone: true,
  templateUrl: './onboarding.component.html',
  styleUrl: './onboarding.component.scss',
})
export class OnboardingComponent {
  private readonly router = inject(Router);
  private readonly onboardingService = inject(OnboardingService);

  readonly slides: OnboardingSlide[] = [
    {
      icon: 'pi pi-map',
      title: 'Welcome to PGE-Rides',
      text: 'Request rides without hassle and track your driver in real time, from pickup to destination.',
    },
    {
      icon: 'pi pi-car',
      title: 'Choose the right ride',
      text: 'Compare categories, check price and estimated time, and request your ride in a few taps.',
    },
    {
      icon: 'pi pi-wallet',
      title: 'Pay with your wallet',
      text: 'Top up your in-app wallet and pay for rides securely — no cash, no card needed.',
    },
  ];

  readonly currentIndex = signal(0);
  readonly currentSlide = computed(() => this.slides[this.currentIndex()]);
  readonly isLastSlide = computed(() => this.currentIndex() === this.slides.length - 1);

  next(): void {
    if (this.isLastSlide()) {
      this.finish();
      return;
    }
    this.currentIndex.update((i) => i + 1);
  }

  skip(): void {
    this.finish();
  }

  private finish(): void {
    this.onboardingService.markAsSeen();
    this.router.navigateByUrl('/auth', { replaceUrl: true });
  }
}
