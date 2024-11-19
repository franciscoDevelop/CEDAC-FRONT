import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldConfig } from 'src/interface/dynamic-field-config';

@Component({
    selector: 'app-dynamic-select',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './dynamic-select.component.html',
    styleUrl: './dynamic-select.component.css',
})
export class DynamicSelectComponent {
    @Input() field!: DynamicFieldConfig;
    @Input() form!: FormGroup;
}
