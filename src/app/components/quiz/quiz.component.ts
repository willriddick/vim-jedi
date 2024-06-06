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

  input_array: string[] = [];
  score: number = 0;

  current_command?: Command;
  commands_quizzed: {command: Command, correct: boolean}[] = [];

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
    this.score = 0;
    this.input_array = [];
    this.commands_quizzed = [];
    this.getNewCommand()
    this.startTimer(length);
  }

  endQuiz(): void {
    this.timer = 0;
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


  checkAnswer(): void {
    if (this.current_command) {
      for (let cmd of this.current_command.command) {
        if (cmd === this.input_string) {
          this.correct(); 
          return;
        }
      }
    }
  }

  correct(): void {
    this.score++;
    this.input_array = [];

    if (this.current_command) {
      this.commands_quizzed.push({
        command: this.current_command,
        correct: true,
      })
    }

    this.getNewCommand();
  }

  skip(): void {
    this.input_array = [];

    if (this.current_command) {
      this.commands_quizzed.push({
        command: this.current_command,
        correct: false,
      })
    }

    this.getNewCommand();
  }



  @HostListener('document:keydown.enter', ['$event']) 
  onTabHandler(_event: KeyboardEvent) {
    if (this.started) {
      this.skip();
    }
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (this.started) {
      if (event.key !== "Enter") {
        this.input_array.push(event.key);
        this.checkAnswer()
      }
    }
  }

  @HostListener('document:keydown.control', ['$event']) 
  onControlHandler(_event: KeyboardEvent) {
    if (this.started) {
      this.input_array.push("Ctrl + ");
      this.checkAnswer()
    }
  }

  @HostListener('document:keydown.backspace', ['$event']) 
  onBackspaceHandler(_event: KeyboardEvent) {
    if (this.started) {
      this.input_array.pop();
      this.checkAnswer()
    }
  }
}
