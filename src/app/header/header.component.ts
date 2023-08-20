import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  links = [
    {path: 'train', name: "Train"},
    {path: 'learn', name: "Learn"},
    {path: 'about', name: "About"},
  ]
}
