import { Injectable } from '@angular/core';
import { Observable, of, throwError, timer } from 'rxjs';
import { delay, switchMap } from 'rxjs/operators';
import { OtpVerifyResponse } from '../models/auth.model';

const KNOWN_PHONES_KEY = 'pge.dev.knownPhones';
const FAKE_LATENCY_MS = 600;

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly issuedCodes = new Map<string, string>();

  requestOtp(phone: string): Observable<void> {
    const code = Math.floor(1000 + Math.random() * 9000).toString();
    this.issuedCodes.set(phone, code);
    console.info(`[DEV] OTP code for +55${phone}: ${code}`);
    return of(undefined).pipe(delay(FAKE_LATENCY_MS));
  }

  verifyOtp(phone: string, code: string): Observable<OtpVerifyResponse> {
    if (this.issuedCodes.get(phone) !== code) {
      return timer(FAKE_LATENCY_MS).pipe(
        switchMap(() => throwError(() => new Error('INVALID_OTP'))),
      );
    }
    this.issuedCodes.delete(phone);
    return of({
      tokens: {
        accessToken: 'dev-access-token',
        refreshToken: 'dev-refresh-token',
      },
      newUser: !this.knownPhones().includes(phone),
    }).pipe(delay(FAKE_LATENCY_MS));
  }

  markPhoneAsKnown(phone: string): void {
    const known = this.knownPhones();
    if (!known.includes(phone)) {
      localStorage.setItem(KNOWN_PHONES_KEY, JSON.stringify([...known, phone]));
    }
  }

  private knownPhones(): string[] {
    return JSON.parse(localStorage.getItem(KNOWN_PHONES_KEY) ?? '[]');
  }
}
