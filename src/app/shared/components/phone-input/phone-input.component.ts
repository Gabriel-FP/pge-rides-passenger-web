import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { InputMaskModule } from 'primeng/inputmask';

@Component({
  selector: 'app-phone-input',
  standalone: true,
  imports: [ReactiveFormsModule, InputMaskModule],
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.scss',
})
export class PhoneInputComponent {
  @Input({ required: true }) control!: FormControl<string>;
}
