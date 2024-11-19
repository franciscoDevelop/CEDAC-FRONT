import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgxTippyModule } from 'ngx-tippy-wrapper';

@Component({
    selector: 'app-action-button',
    standalone: true,
    imports: [CommonModule, NgxTippyModule],
    templateUrl: './action-button.component.html',
    styleUrl: './action-button.component.css',
})
export class ActionButtonComponent {
    @Input() label!: string;
    @Input() tooltipContent!: string;
    @Input() action!: () => void;
    @Input() icon!: string;
    @Input() color!: string;
}
