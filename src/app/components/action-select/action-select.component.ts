import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-action-select',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './action-select.component.html',
    styleUrl: './action-select.component.css',
})
export class ActionSelectComponent {
    @Input() options!: string[];
    @Input() action!: (value: string) => void;

    onChange(event: Event) {
        const value = (event.target as HTMLSelectElement).value;
        this.action(value);
    }
}
