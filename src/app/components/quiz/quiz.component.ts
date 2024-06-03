import { Component, HostListener } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { Command } from '../../command.model';
import { ButtonComponent } from '../button/button.component';
import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [ButtonComponent, CommandComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  current_command!: Command;

  input_string: string = "";
  input_array: string[] = [];

  constructor(public commandService: CommandService) {}

  getNext(): void {
    this.current_command = this.commandService.getRandomCommand();
    console.log(this.current_command);
  }

  toggleCategory(category: number): void {
    if ((this.commandService.categoryEnabled(category))) {
      this.commandService.removeCategory(category);
    }
    else {
      this.commandService.addCategory(category);
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key !== "Enter") {
      this.input_array.push(event.key);
      this.buildString();
    }
  }


  @HostListener('document:keydown.backspace', ['$event']) 
  onKeydownHandler(event: KeyboardEvent) {
    this.input_array.pop();
    this.buildString();
  }

  buildString = (): void => {
    this.input_string = "";

    for (let i = 0; i < this.input_array.length; i++) {
      this.input_string += this.input_array[i];
    }
  }
}
