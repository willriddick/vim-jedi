import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ButtonComponent } from '../button/button.component';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "Vim Quiz";

  links = [
    {name: "Quiz", link: "/quiz"},
    {name: "Learn", link: "/learn"}
  ];

  constructor(private route: ActivatedRoute, private router: Router) {}

  routeTo(link: string): void {
    this.router.navigate([link], { relativeTo: this.route })
  }

  isEnabled(link: string): boolean {
    return this.router.url === link;
  }
}
