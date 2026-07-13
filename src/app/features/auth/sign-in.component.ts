import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { brPhoneValidator } from '../../core/validators/br-phone.validator';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { AuthStore } from '../../core/stores/auth.store';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, CheckboxModule, PhoneInputComponent],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);

  readonly form = this.formBuilder.group({
    phone: ['', [Validators.required, brPhoneValidator()]],
    rememberMe: [false],
  });

  get phoneControl() {
    return this.form.controls.phone;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const { phone, rememberMe } = this.form.getRawValue();
    this.authStore.startVerification(phone, rememberMe).subscribe(() => {
      this.router.navigate(['/auth/otp']);
    });
  }
}
