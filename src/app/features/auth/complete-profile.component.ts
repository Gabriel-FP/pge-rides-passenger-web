import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { AuthApiService } from '../../core/api/auth-api.service';
import { AuthStore } from '../../core/stores/auth.store';

@Component({
  selector: 'app-complete-profile',
  standalone: true,
  imports: [ReactiveFormsModule, ButtonModule],
  templateUrl: './complete-profile.component.html',
  styleUrl: './complete-profile.component.scss',
})
export class CompleteProfileComponent {
  private readonly formBuilder = inject(NonNullableFormBuilder);
  private readonly router = inject(Router);
  private readonly authApi = inject(AuthApiService);
  private readonly authStore = inject(AuthStore);

  readonly avatarPreview = signal<string | null>(null);

  readonly form = this.formBuilder.group({
    name: ['', Validators.required],
    email: ['', Validators.email],
  });

  onAvatarSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (!file) {
      return;
    }
    const reader = new FileReader();
    reader.onload = () => this.avatarPreview.set(reader.result as string);
    reader.readAsDataURL(file);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }
    const phone = this.authStore.pendingPhone();
    if (phone) {
      this.authApi.markPhoneAsKnown(phone);
    }
    this.router.navigateByUrl('/app', { replaceUrl: true });
  }
}
