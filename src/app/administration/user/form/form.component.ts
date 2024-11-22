import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { UserEditInterface } from 'src/interface/user-edit-interface';

@Component({
    selector: 'app-form',
    templateUrl: './form.component.html',
    styleUrl: './form.component.css',
})
export class FormComponent implements OnInit {
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'CREAR USUARIO', link: '/administracion/usuarios/nuevo' },
    ];
    title: string = 'Usuario';
    rpe: string | undefined;
    user!: UserEditInterface;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id'] != undefined) {
                this.rpe = params['id'];
                this.userService.getUser(params['id']).subscribe((res) => {
                    this.user = res;
                });
            }
        });
    }
}
