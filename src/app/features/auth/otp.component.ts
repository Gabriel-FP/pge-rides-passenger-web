import { Component, OnDestroy, OnInit, computed, inject, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthStore } from '../../core/stores/auth.store';
import { OtpInputComponent } from '../../shared/components/otp-input/otp-input.component';

const RESEND_COOLDOWN_SECONDS = 60;
const OTP_LENGTH = 4;

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [RouterLink, ButtonModule, OtpInputComponent],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss',
})
export class OtpComponent implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);
  private intervalId?: number;

  readonly codeControl = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.minLength(OTP_LENGTH)],
  });

  readonly secondsLeft = signal(RESEND_COOLDOWN_SECONDS);
  readonly canResend = computed(() => this.secondsLeft() === 0);
  readonly isVerifying = signal(false);
  readonly verifyError = signal<string | null>(null);

  readonly maskedPhone = computed(() => {
    const phone = this.authStore.pendingPhone();
    return phone ? `+55 (${phone.slice(0, 2)}) •••••-${phone.slice(-4)}` : '';
  });

  constructor() {
    this.codeControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((value) => {
      if (value.length === OTP_LENGTH && !this.isVerifying()) {
        this.verify();
      }
    });
  }

  ngOnInit(): void {
    if (!this.authStore.pendingPhone()) {
      this.router.navigateByUrl('/auth', { replaceUrl: true });
      return;
    }
    this.startCooldown();
  }

  ngOnDestroy(): void {
    window.clearInterval(this.intervalId);
  }

  verify(): void {
    if (this.codeControl.invalid || this.isVerifying()) {
      this.codeControl.markAsTouched();
      return;
    }
    this.verifyError.set(null);
    this.isVerifying.set(true);
    this.authStore.verifyCode(this.codeControl.value).subscribe({
      next: (response) => {
        const target = response.newUser ? '/auth/complete-profile' : '/app';
        this.router.navigateByUrl(target, { replaceUrl: true });
      },
      error: () => {
        this.isVerifying.set(false);
        this.verifyError.set('Invalid code. Check the digits and try again.');
        this.codeControl.setValue('');
      },
    });
  }

  resend(): void {
    if (!this.canResend()) {
      return;
    }
    this.authStore.resendCode().subscribe(() => {
      this.secondsLeft.set(RESEND_COOLDOWN_SECONDS);
      this.startCooldown();
    });
  }

  private startCooldown(): void {
    window.clearInterval(this.intervalId);
    this.intervalId = window.setInterval(() => {
      this.secondsLeft.update((seconds) => {
        if (seconds <= 1) {
          window.clearInterval(this.intervalId);
          return 0;
        }
        return seconds - 1;
      });
    }, 1000);
  }
}
