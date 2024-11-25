import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/service/user.service';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { CedacRolesInterface } from 'src/interface/cedac-roles-interface';
import { ExpertRolesInterface } from 'src/interface/expert-roles-interface';
import { GroupLoadInterface } from 'src/interface/group-load-interface';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
    @ViewChild('expertCEDACRoles') expertCEDACRoles!: ElementRef<HTMLSelectElement>;
    @ViewChild('selectedExpertCEDACRoles') selectedExpertCEDACRoles!: ElementRef<HTMLSelectElement>;
    @ViewChild('cedacRolesSelect') cedacRolesSelect!: ElementRef<HTMLSelectElement>;
    @ViewChild('selectedCedacRoles') selectedCedacRoles!: ElementRef<HTMLSelectElement>;

    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'ASIGNACIÓN DE ROLES', link: '/administracion/usuarios/asignacion-roles' },
    ];
    title: string = 'Modifique los roles del usuario:';
    rpe: string | undefined;
    userName: string | undefined;
    rolesForm: FormGroup;
    expertRoles: GroupLoadInterface[] = [];
    cedacRoles: GroupLoadInterface[] = [];
    user: any;

    constructor(
        private route: ActivatedRoute,
        private userService: UserService,
        private fb: FormBuilder,
    ) {
        this.rolesForm = this.fb.group({
            RPEejec: [''],
            Nombre: [''],
            expertRoles: [[]],
            cedacRoles: [[]],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id'] != undefined) {
                this.rpe = params['id'];
                this.userName = 'Tes Test ';
                // this.getUserData(params['id']);
                this.getExpertRoles(params['id']);
                this.getCEDACRoles(params['id']);
            }
        });
    }

    getUserData(RPEejec: string): void {
        // this.userService.getUserData(RPEejec).subscribe(data => {
        //   this.user = data;
        //   this.userForm.patchValue({
        //     RPEejec: this.user.RPEejec,
        //     Nombre: this.user.Nombre,
        //     Roles: this.user.Roles
        //   });
        //   this.roles = this.user.RolesDisponibles;
        // });
    }

    getExpertRoles(rpe: string): void {
        this.userService.getExpertRoles(rpe).subscribe((response: ExpertRolesInterface) => {
            this.expertRoles = response.data;
        });
    }

    getCEDACRoles(rpe: string): void {
        this.userService.getCEDACRoles(rpe).subscribe((response: CedacRolesInterface) => {
            this.cedacRoles = response.data;
        });
    }

    addExpertRolesSelected(): void {
        const selectedExpertRoles = Array.from(this.expertCEDACRoles.nativeElement.selectedOptions).map((option) => option.value);

        selectedExpertRoles.forEach((roleSelected) => {
            this.expertRoles.forEach((role) => {
                if (role.groupName === roleSelected) {
                    role.active = true;
                }
            });
        });
    }

    addCedacRolesSelected(): void {
        const selectedCedacRoles = Array.from(this.cedacRolesSelect.nativeElement.selectedOptions).map((option) => option.value);

        selectedCedacRoles.forEach((roleSelected) => {
            this.cedacRoles.forEach((role) => {
                if (role.groupName === roleSelected) {
                    role.active = true;
                }
            });
        });
    }

    removeExpertRolesSelected(): void {
        const selectedExpertRoles = Array.from(this.selectedExpertCEDACRoles.nativeElement.selectedOptions).map((option) => option.value);

        selectedExpertRoles.forEach((roleSelected) => {
            this.expertRoles.forEach((role) => {
                if (role.groupName === roleSelected) {
                    role.active = false;
                }
            });
        });
    }

    removeCedacRolesSelected(): void {
        const selectedCedacRoles = Array.from(this.selectedCedacRoles.nativeElement.selectedOptions).map((option) => option.value);

        selectedCedacRoles.forEach((roleSelected) => {
            this.cedacRoles.forEach((role) => {
                if (role.groupName === roleSelected) {
                    role.active = false;
                }
            });
        });
    }

    hasRequest(): boolean {
        return this.expertRoles.some((role) => role.active) || this.cedacRoles.some((role) => role.active);
    }

    onSubmit(): void {
        // this.userService.updateUserRoles(this.userForm.value).subscribe(response => {
        //   console.log('Roles updated successfully');
        // });
    }
}
