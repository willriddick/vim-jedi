import { Component } from '@angular/core';
import { CommandService } from '../../services/command.service';

@Component({
  selector: 'app-quiz',
  standalone: true,
  imports: [],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css'
})
export class QuizComponent {


  constructor(private commandService: CommandService) {}

  
}
