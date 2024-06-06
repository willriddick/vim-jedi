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

  get prompt(): string {
    if (this.numberCategoriesSelected() === 0) {
      return "Select a category to begin...";
    }
    if (this.started) return "GO GO GO";
    return "Select more if you like...";
  }

  input_array: string[] = [];

  current_command?: Command;
  private commands_quizzed: {command: Command, correct: boolean}[] = [];

  quiz_lengths: number[] = [10,30,60];
  timer: number = 0;
  started: boolean = false;
  private interval_id: any;


  constructor(public commandService: CommandService) {}

  get input_string(): string {
    let string = "";
    for (let i = 0; i < this.input_array.length; i++) {
      string += this.input_array[i];
    }
    return string;
  }

  startQuiz(length: number) {
    this.started = true;
    this.startTimer(length);
    this.getNewCommand()
  }

  endQuiz(): void {
    this.started = false;
    if (this.interval_id) {
      clearInterval(this.interval_id);
    }
    this.current_command = undefined;
  }

  canStart(): boolean {
    return (this.started === false) && (this.numberCategoriesSelected() >= 1);
  }

  numberCategoriesSelected(): number  {
    return this.commandService.categories_enabled;
  }

 

  startTimer(length: number): void {
    this.timer = length;
    this.interval_id = setInterval(() => {
      this.timer -= 1
      if (this.timer === 0) {
        this.endQuiz();
      }
    }, 1000)
  }

  getNewCommand(): void {
    this.current_command = this.commandService.getRandomCommand();
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
  onControlHandler(_event: KeyboardEvent) {
    this.input_array.push("Ctrl + ");
  }

  @HostListener('document:keydown.backspace', ['$event']) 
  onBackspaceHandler(_event: KeyboardEvent) {
    this.input_array.pop();
  }
}
