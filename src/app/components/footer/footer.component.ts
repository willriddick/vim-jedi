import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  links = [
    {name: "official vim", href: "https://github.com/vim/vim"},
    {name: "vim commands", href: "https://vim.rtorr.com/"},
    {name: "github", href: "https://github.com/willriddick"},
    {name: "itch", href: "https://willriddick.itch.io/"},
    {name: "linkedin", href: "https://www.linkedin.com/in/will-riddick/"},
  ];
}
