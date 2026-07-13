import { Injectable, computed, inject, signal } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthApiService } from '../api/auth-api.service';
import { AuthTokens, OtpVerifyResponse } from '../models/auth.model';

const TOKENS_KEY = 'pge.auth.tokens';

function readStoredTokens(): AuthTokens | null {
  const raw = sessionStorage.getItem(TOKENS_KEY) ?? localStorage.getItem(TOKENS_KEY);
  return raw ? (JSON.parse(raw) as AuthTokens) : null;
}

@Injectable({ providedIn: 'root' })
export class AuthStore {
  private readonly api = inject(AuthApiService);

  private readonly tokensSignal = signal<AuthTokens | null>(readStoredTokens());
  private readonly pendingPhoneSignal = signal<string | null>(null);
  private rememberMe = true;

  readonly isAuthenticated = computed(() => this.tokensSignal() !== null);
  readonly pendingPhone = this.pendingPhoneSignal.asReadonly();

  startVerification(phone: string, rememberMe: boolean): Observable<void> {
    this.pendingPhoneSignal.set(phone);
    this.rememberMe = rememberMe;
    return this.api.requestOtp(phone);
  }

  resendCode(): Observable<void> {
    const phone = this.pendingPhoneSignal();
    if (!phone) {
      throw new Error('No verification in progress');
    }
    return this.api.requestOtp(phone);
  }

  verifyCode(code: string): Observable<OtpVerifyResponse> {
    const phone = this.pendingPhoneSignal();
    if (!phone) {
      throw new Error('No verification in progress');
    }
    return this.api.verifyOtp(phone, code).pipe(
      tap((response) => {
        this.tokensSignal.set(response.tokens);
        this.persistTokens(response.tokens);
      }),
    );
  }

  logout(): void {
    this.tokensSignal.set(null);
    this.pendingPhoneSignal.set(null);
    localStorage.removeItem(TOKENS_KEY);
    sessionStorage.removeItem(TOKENS_KEY);
  }

  private persistTokens(tokens: AuthTokens): void {
    const storage = this.rememberMe ? localStorage : sessionStorage;
    storage.setItem(TOKENS_KEY, JSON.stringify(tokens));
  }
}
