import { TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { CompleteProfileComponent } from './complete-profile.component';
import { AuthApiService } from '../../core/api/auth-api.service';
import { AuthStore } from '../../core/stores/auth.store';
import { signal } from '@angular/core';

describe('CompleteProfileComponent', () => {
  let authApi: jasmine.SpyObj<AuthApiService>;
  let router: Router;

  beforeEach(async () => {
    authApi = jasmine.createSpyObj<AuthApiService>('AuthApiService', ['markPhoneAsKnown']);

    await TestBed.configureTestingModule({
      imports: [CompleteProfileComponent],
      providers: [
        provideRouter([]),
        { provide: AuthApiService, useValue: authApi },
        { provide: AuthStore, useValue: { pendingPhone: signal('85991234567') } },
      ],
    }).compileComponents();

    router = TestBed.inject(Router);
    spyOn(router, 'navigateByUrl');
  });

  it('should start invalid without a name', () => {
    const component = TestBed.createComponent(CompleteProfileComponent).componentInstance;
    expect(component.form.invalid).toBeTrue();
  });

  it('should be valid with only a name (email is optional)', () => {
    const component = TestBed.createComponent(CompleteProfileComponent).componentInstance;
    component.form.setValue({ name: 'Ana Souza', email: '' });
    expect(component.form.valid).toBeTrue();
  });

  it('should reject a malformed email', () => {
    const component = TestBed.createComponent(CompleteProfileComponent).componentInstance;
    component.form.setValue({ name: 'Ana Souza', email: 'not-an-email' });
    expect(component.form.valid).toBeFalse();
  });

  it('should mark the phone as known and go to the app on submit', () => {
    const component = TestBed.createComponent(CompleteProfileComponent).componentInstance;
    component.form.setValue({ name: 'Ana Souza', email: '' });
    component.submit();
    expect(authApi.markPhoneAsKnown).toHaveBeenCalledWith('85991234567');
    expect(router.navigateByUrl).toHaveBeenCalledWith('/app', { replaceUrl: true });
  });
});
