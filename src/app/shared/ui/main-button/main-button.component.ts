import { Component, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-button',
  imports: [RouterLink],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  fullWidth = input<boolean>(false);
  link: InputSignal<string> = input.required();
  text = input<string>('Click Here');
}
