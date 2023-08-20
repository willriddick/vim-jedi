import { Component, OnInit } from '@angular/core';
import { CommandService } from '../train/command.service';
import { Command } from '../train/command';


@Component({
  selector: 'app-learn',
  templateUrl: './learn.component.html',
  styleUrls: ['./learn.component.css']
})
export class LearnComponent implements OnInit { 
  constructor(
    public commandService: CommandService,
  ) {}
  
  public commands: Array<Command> = [];

  ngOnInit() {
    this.commandService.clearSettings();
    this.changeSetting(0);
  }

  changeSetting = (index: number): void => {
    this.commandService.enableSettingLearn(index); 
    this.commands = this.commandService.settings[index]["array"];
  }
}
