import { Component } from '@angular/core';
import { CommandService } from '../../services/command.service';
import { CommandComponent } from '../command/command.component';

@Component({
  selector: 'app-learn',
  standalone: true,
  imports: [CommandComponent],
  templateUrl: './learn.component.html',
  styleUrl: './learn.component.css'
})
export class LearnComponent {

  selected: number = 0;

  constructor(public commandService: CommandService) {}

  selectCategory(category: number) {
    this.selected = category;
  }
}
