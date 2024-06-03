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
  @Input() enabled: boolean = false;
  @Input() enabled_color: string = this.color;

  getColor(): string {
    if (!this.enabled) {
      return this.color;
    } else {
      return this.enabled_color
    }
  }

  clicked = output();

  onClick(): void {
    this.clicked.emit();
  }
}
