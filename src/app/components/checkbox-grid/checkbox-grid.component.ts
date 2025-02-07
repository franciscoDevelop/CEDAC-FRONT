import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';

interface CheckboxOption {
    controlName: string;
    label: string;
    value: any;
    onChange?: (value: any) => void;
}

interface CheckboxGroupOptions {
    title?: string;
    checkboxes: CheckboxOption[];
}

interface CheckboxGroup {
    title: string;
    checkboxes: CheckboxGroupOptions[];
}

@Component({
    selector: 'app-checkbox-grid',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule],
    templateUrl: './checkbox-grid.component.html',
    styleUrl: './checkbox-grid.component.css',
})
export class CheckboxGridComponent {
    @Input() columns: number = 2; // Número de columnas
    @Input() checkboxGroups: CheckboxGroup[] = []; // Agrupaciones de checkboxes
    @Input() form!: FormGroup; // Formulario a usar en el grid

    getColumnClass(): string {
        return `${Math.floor(12 / this.columns)}/12`; // Calcula el ancho de columna
    }

    // Método que se llamará en el cambio del checkbox
    handleChange(event: Event, option: CheckboxOption) {
        const checkboxValue = (event.target as HTMLInputElement).checked;
        if (option.onChange) {
            option.onChange(checkboxValue); // Llama a la función específica del checkbox si existe
        }
    }
}
