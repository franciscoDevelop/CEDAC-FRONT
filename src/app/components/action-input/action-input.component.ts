import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DynamicFieldConfig } from 'src/interface/dynamic-field-config';

@Component({
    selector: 'app-action-input',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './action-input.component.html',
    styleUrl: './action-input.component.css',
})
export class ActionInputComponent {
    @Input() field!: DynamicFieldConfig;
    @Input() form!: FormGroup;
}
