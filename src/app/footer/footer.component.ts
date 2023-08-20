import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  links = [
    {name: "official vim", href: "https://github.com/vim/vim"},
    {name: "vim commands", href: "https://vim.rtorr.com/"},
    {name: "github", href: "https://github.com/willriddick"},
    {name: "itch", href: "https://willriddick.itch.io/"},
    {name: "linkedin", href: "https://www.linkedin.com/in/will-riddick/"},
  ]
}
