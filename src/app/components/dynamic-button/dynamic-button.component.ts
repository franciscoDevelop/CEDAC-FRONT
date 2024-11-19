import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { DynamicFieldConfig } from 'src/interface/dynamic-field-config';

@Component({
    selector: 'app-dynamic-button',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './dynamic-button.component.html',
    styleUrl: './dynamic-button.component.css',
})
export class DynamicButtonComponent {
    @Input() field!: DynamicFieldConfig;
}
