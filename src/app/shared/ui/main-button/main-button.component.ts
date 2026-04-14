import { Component, computed, input, InputSignal } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-main-button',
  imports: [RouterLink],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  fullWidth = input<boolean>(false);
  isBlue = input<boolean>(false);
  isWhite = input<boolean>(false);
  link: InputSignal<string> = input.required();
  text = input<string>('Click Here');

  buttonColors = computed(() => {
    if (this.isBlue()) {
      return 'bg-mainColorLight hover:bg-mainColorDark text-white/80 hover:text-white';
    }
    if (this.isWhite()) {
      return 'bg-white/80 hover:bg-white text-mainColorLight hover:text-mainColorDark';
    }
    return '';
  });
}
