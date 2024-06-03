import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  links = [
    {name: "official vim", href: "https://github.com/vim/vim"},
    {name: "my github", href: "https://github.com/willriddick"},
    {name: "my itch", href: "https://willriddick.itch.io/"},
    {name: "my linkedin", href: "https://www.linkedin.com/in/will-riddick/"},
  ];
}
