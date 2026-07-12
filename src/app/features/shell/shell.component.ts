import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

interface NavItem {
  label: string;
  icon: string;
  route: string;
}

@Component({
  selector: 'app-shell',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './shell.component.html',
  styleUrl: './shell.component.scss'
})
export class ShellComponent {
  readonly navItems: NavItem[] = [
    { label: 'Home', icon: 'pi pi-home', route: '/app/home' },
    { label: 'Activity', icon: 'pi pi-clock', route: '/app/activity' },
    { label: 'Account', icon: 'pi pi-user', route: '/app/account' },
  ];
}
