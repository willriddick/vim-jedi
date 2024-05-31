import { Component } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { Command } from '../../Command';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  current!: Command;

  constructor(public commandService: CommandService) {}

  getNext(): void {
    this.current = this.commandService.getRandomCommand();
    console.log(this.current);
  }

  toggleCategory(category: number): void {
    if ((this.commandService.categoryEnabled(category))) {
      this.commandService.removeCategory(category);
    }
    else {
      this.commandService.addCategory(category);
    }
  }
}
