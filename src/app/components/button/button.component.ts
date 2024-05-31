import { Component, Input, output } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css'
})
export class ButtonComponent {
  @Input({required: true}) text: string = "default";
  @Input({required: true}) color: string = "black";
  clicked = output();

  onClick(): void {
    this.clicked.emit();
  }
}
