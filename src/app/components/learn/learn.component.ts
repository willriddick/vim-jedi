import { Component } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { Command } from '../../Command';
import { ButtonComponent } from '../button/button.component';
import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [ButtonComponent, CommandComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {

  selected: number = 0;
  enabled_color: string = 'green';
  disabled_color: string = 'orange';

  constructor(public commandService: CommandService) {}

  selectCategory(category: number) {
    this.selected = category;
  }
}
