import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
})
export class FormComponent {
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'CREAR USUARIO', link: '/administracion/usuarios/nuevo' },
    ];
    title: string = 'Usuario';
    form: FormGroup;

    constructor(private readonly fb: FormBuilder) {
        this.form = this.fb.group({
            rpe: [''],
            name: [''],
        });
    }
}
