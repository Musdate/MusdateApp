import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-close',
  standalone: true,
  template: `
    <div class="iconContainer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="iconClass">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M18 6l-12 12" />
          <path d="M6 6l12 12" />
      </svg>
    </div>
  `
})
export class CloseIconComponent {
    @Input() iconClass: string = '';
}