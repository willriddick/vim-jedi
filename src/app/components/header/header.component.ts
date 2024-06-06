import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';


@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  title: string = "Vim Jedi";

  routes = [
    {name: "Quiz", link: "/quiz"},
    {name: "Learn", link: "/learn"},
  ];

  links = [
    {name: "github", href: "https://github.com/willriddick"},
    {name: "linkedin", href: "https://www.linkedin.com/in/will-riddick/"},
    {name: "itch", href: "https://willriddick.itch.io/"},
    {name: "official", href: "https://github.com/vim/vim"},
  ];
}
