import { Component, inject } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { brPhoneValidator } from '../../core/validators/br-phone.validator';
import { PhoneInputComponent } from '../../shared/components/phone-input/phone-input.component';
import { AuthStore } from '../../core/stores/auth.store';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, ButtonModule, CheckboxModule, PhoneInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authStore = inject(AuthStore);

  readonly form = this.formBuilder.group({
    phone: ['', [Validators.required, brPhoneValidator()]],
    acceptedTerms: [false, Validators.requiredTrue],
  });

  get phoneControl() {
    return this.form.controls.phone;
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    this.authStore.startVerification(this.form.getRawValue().phone, true).subscribe(() => {
      this.router.navigate(['/auth/otp']);
    });
  }
}
