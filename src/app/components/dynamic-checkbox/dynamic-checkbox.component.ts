import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldConfig } from 'src/interface/dynamic-field-config';

@Component({
    selector: 'app-dynamic-checkbox',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './dynamic-checkbox.component.html',
    styleUrl: './dynamic-checkbox.component.css',
})
export class DynamicCheckboxComponent {
    @Input() field!: DynamicFieldConfig;
    @Input() form!: FormGroup;
}
