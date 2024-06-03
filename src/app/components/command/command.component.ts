import { Component, Input } from '@angular/core';
import { Command } from '../../command.model';

@Component({
  selector: 'app-command',
  standalone: true,
  imports: [],
  templateUrl: './command.component.html',
  styleUrl: './command.component.css'
})
export class CommandComponent {
  @Input() command!: Command;
}
