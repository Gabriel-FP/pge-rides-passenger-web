import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputOtpModule } from 'primeng/inputotp';

@Component({
  selector: 'app-otp-input',
  standalone: true,
  imports: [ReactiveFormsModule, InputOtpModule],
  templateUrl: './otp-input.component.html',
  styleUrl: './otp-input.component.scss',
})
export class OtpInputComponent {
  @Input({ required: true }) control!: FormControl<string>;
  @Input() length = 4;
}
