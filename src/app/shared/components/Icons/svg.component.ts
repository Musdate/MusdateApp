import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-svg',
  standalone: true,
  templateUrl: './svg.component.html',
  styleUrl: './svg.component.scss'
})
export class SvgComponent {
    @Input() iconClass = '';
    @Input() iconName = '';
}
