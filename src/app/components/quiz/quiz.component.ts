import { Component, HostListener } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { Command } from '../../command.model';
import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [CommandComponent],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {

  current_command!: Command;

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
    this.input_array.push(event.key);
  }

  @HostListener('document:keydown.control', ['$event']) 
  onControlHandler(event: KeyboardEvent) {
    this.input_array.push("Ctrl + ");
  }

  @HostListener('document:keydown.backspace', ['$event']) 
  onBackspaceHandler(event: KeyboardEvent) {
    this.input_array.pop();
  }

  get input_string(): string {
    let string = "";
    for (let i = 0; i < this.input_array.length; i++) {
      string += this.input_array[i];
    }
    return string;
  }
}
