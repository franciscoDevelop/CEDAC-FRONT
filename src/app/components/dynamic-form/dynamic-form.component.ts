import { DynamicSelectComponent } from './../dynamic-select/dynamic-select.component';
import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormModule } from 'src/app/forms/form.module';
import { DynamicFieldConfig } from 'src/interface/dynamic-field-config';
import { ActionInputComponent } from '../action-input/action-input.component';
import { DynamicCheckboxComponent } from '../dynamic-checkbox/dynamic-checkbox.component';
import { DynamicButtonComponent } from '../dynamic-button/dynamic-button.component';

@Component({
    selector: 'app-dynamic-form',
    standalone: true,
    imports: [CommonModule, FormModule, ReactiveFormsModule, ActionInputComponent, DynamicSelectComponent, DynamicCheckboxComponent, DynamicButtonComponent],
    templateUrl: './dynamic-form.component.html',
    styleUrl: './dynamic-form.component.css',
})
export class DynamicFormComponent implements OnInit {
    @Input() fields: { [key: string]: DynamicFieldConfig[] } = {};
    form: FormGroup;

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({});
    }

    ngOnInit(): void {
        // Inicializar controles en el formulario reactivo
        Object.values(this.fields).forEach((section) =>
            section.forEach((field) => {
                if (field.name) {
                    this.form.addControl(field.name, this.fb.control(field.value || ''));
                }
            }),
        );
    }

    get FieldRowsKeys(): string[] {
        return Object.keys(this.fields);
    }

    getSectionRows(sectionKey: string): DynamicFieldConfig[][] {
        const sectionFields = this.fields[sectionKey] || [];
        return this.getRows(sectionFields);
    }

    /**
     * Calcula las clases de grilla basándose en el número de elementos en una sección.
     */
    getGridCols(section: DynamicFieldConfig[]): string {
        const itemCount = section.length;
        if (itemCount <= 2) return 'grid-cols-1 sm:grid-cols-2';
        if (itemCount === 3) return 'grid-cols-1 md:grid-cols-3';
        return 'grid-cols-1 lg:grid-cols-4';
    }

    /**
     * Retorna las filas agrupadas en base al número de filas especificado.
     */
    getRows(section: DynamicFieldConfig[]): DynamicFieldConfig[][] {
        const rows = section.reduce(
            (acc, field) => {
                const row = field.row || 1;
                acc[row] = acc[row] || [];
                acc[row].push(field);
                return acc;
            },
            {} as { [key: number]: DynamicFieldConfig[] },
        );
        return Object.values(rows);
    }

    onSubmit(): void {
        console.log('Form Values:', this.form.value);
    }
}
