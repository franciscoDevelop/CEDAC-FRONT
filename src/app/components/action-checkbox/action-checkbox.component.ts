import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-action-checkbox',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './action-checkbox.component.html',
    styleUrl: './action-checkbox.component.css',
})
export class ActionCheckboxComponent {
    @Input() checked!: boolean;
    @Input() action!: (checked: boolean) => void;

    onChange(event: Event) {
        const checked = (event.target as HTMLInputElement).checked;
        this.action(checked);
    }
}
