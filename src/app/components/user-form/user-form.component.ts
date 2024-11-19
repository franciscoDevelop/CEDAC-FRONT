import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {
    @Input() title!: string;

    form!: FormGroup;
    isSubmitForm = false;

    constructor(private readonly fb: FormBuilder) {
        this.initForm();
    }

    initForm() {
        this.form = this.fb.group({
            rpe: ['', Validators.required],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            phone: ['', Validators.required],
            society: [''],
            profitCenter: [''],
            costCenter: ['', Validators.required],
            // Add other form controls as needed
        });
    }

    onSubmit(): void {
        this.isSubmitForm = true;
        if (this.form.valid) {
            console.log('Form Submitted', this.form.value);
        }
    }
}
