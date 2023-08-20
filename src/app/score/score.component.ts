import { Component } from '@angular/core';
import { HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { CommandService } from '../train/command.service';


@Component({
  selector: 'app-score',
  templateUrl: './score.component.html',
  styleUrls: ['./score.component.css']
})
export class ScoreComponent {
 
  constructor(
    private router: Router,
    public commandService: CommandService,
  ) {}

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key === "Enter") {
      this.router.navigate(['train']);
    }
  }
}
