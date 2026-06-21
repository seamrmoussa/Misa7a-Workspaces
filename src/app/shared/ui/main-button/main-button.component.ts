import { Component, computed, input, output } from '@angular/core';

@Component({
  selector: 'app-main-button',
  imports: [],
  templateUrl: './main-button.component.html',
  styleUrl: './main-button.component.css',
})
export class MainButtonComponent {
  btnType = input('button');
  btnIcon = input('');
  text = input.required<string>();
  btnClick = output<MouseEvent>();

  btnColor = input<string>('bg-mainColorDark text-white/80 hover:text-white');
  btnClasses = input<string>('');

  handleClick(event: MouseEvent) {
    if (this.btnType() === 'button') {
      event.preventDefault();
      event.stopPropagation();
    }

    this.btnClick.emit(event);
  }

  classComponent = computed(() => {});
}
