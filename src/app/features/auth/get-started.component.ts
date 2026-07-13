import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

interface SocialProvider {
  icon: string;
  label: string;
  available: boolean;
}

@Component({
  selector: 'app-get-started',
  standalone: true,
  imports: [RouterLink, ButtonModule],
  templateUrl: './get-started.component.html',
  styleUrl: './get-started.component.scss',
})
export class GetStartedComponent {
  readonly socialProviders: SocialProvider[] = [
    { icon: 'pi pi-google', label: 'Continue with Google', available: true },
    { icon: 'pi pi-apple', label: 'Continue with Apple', available: false },
    { icon: 'pi pi-facebook', label: 'Continue with Facebook', available: false },
    { icon: 'pi pi-twitter', label: 'Continue with X', available: false },
  ];
}
