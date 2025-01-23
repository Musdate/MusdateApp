import { Component, Input } from '@angular/core';

@Component({
  selector: 'icon-recipes',
  standalone: true,
  template: `
    <div class="iconContainer">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" [class]="iconClass">
          <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
          <path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" />
          <path d="M14 19l2 2l4 -4" />
          <path d="M9 8h4" />
          <path d="M9 12h2" />
      </svg>
    </div>
  `
})
export class RecipesIconComponent {
    @Input() iconClass: string = '';
}