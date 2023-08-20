import { Component, OnInit } from '@angular/core';
import { HostListener } from '@angular/core';
import { CommandService } from './command.service';
import { Command } from './command';
import { Router } from '@angular/router';


@Component({
  selector: 'train-about',
  templateUrl: './train.component.html',
  styleUrls: ['./train.component.css']
})
export class TrainComponent implements OnInit { 

  question: string = "initial";
  answer: string = "initial";
  input_array: Array<string> = [];
  input_string: string = "";

  waiting: boolean = true;
  waiting_text: string = "Type to Begin Test";

  score: number = 0;
  time_length: number = 30;
  timer: number = 0;
  started: boolean = false;
  
  constructor(
    public router: Router,
    public commandService: CommandService,
  ) {}


  ngOnInit() {
    this.commandService.clearSettings();
    this.getNewCommand();
  }


  startTest = (): void => {
    if (!this.started) {
      this.started = true;
      this.score = 0;
      this.startTimer(this.time_length);
    }
  }


  endTest = (): void => {
    this.commandService.setScore(this.score);
    this.router.navigate(['train/score']);
  }


  startTimer = (length: number): void => {
    this.timer = length;
    let intervalId = setInterval(() => {
      if (this.timer === 0) this.endTest(); 
      this.timer -= 1
    }, 1000)
  }


  buildString = (): void => {
    this.waiting_text = "..."
    this.input_string = "";

    for (let i = 0; i < this.input_array.length; i++) {
      this.input_string += this.input_array[i];
    }

    if (this.input_string === "") this.waiting = true;
    else this.waiting = false;
  }


  isCorrect = (): void => {
    if (this.input_string === this.answer) {
      this.score += 1;
      this.input_array = [];
      this.input_string = "";
      this.getNewCommand()
      this.waiting = true;
    }
  }


  getNewCommand = (): void => {
    let command: Command = this.commandService.getNew();
    this.question = command['question'];
    this.answer = command['answer'];
    //console.log(this.question + ": " + this.answer);
  }


  changeSetting = (index: number): void => {
    this.commandService.enableSettingTrain(index); 
    this.getNewCommand();
  }


  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) { 
    if (event.key !== "Enter") {
      this.startTest();
      this.input_array.push(event.key);
      this.buildString();
      this.isCorrect();
    }
  }


  @HostListener('document:keydown.backspace', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    this.startTest();
    this.input_array.pop();
    this.buildString();
    this.isCorrect();
  }
}
