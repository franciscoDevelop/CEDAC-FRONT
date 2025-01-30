import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { forkJoin, map, Observable } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { FunctionService } from 'src/app/service/function.service';
import { UserService } from 'src/app/service/user.service';
import { setJustification } from 'src/app/store/actions';
import { justification } from 'src/app/store/selectors';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { CedacRolesInterface } from 'src/interface/cedac-roles-interface';
import { ExpertRolesInterface } from 'src/interface/expert-roles-interface';
import { GroupLoadInterface } from 'src/interface/group-load-interface';
import { HasRequestInterface } from 'src/interface/has-request-interface';

@Component({
    selector: 'app-roles',
    templateUrl: './roles.component.html',
    styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit, AfterViewInit {
    @ViewChildren('expertCEDACRoles') expertCEDACRoles!: QueryList<ElementRef<HTMLInputElement>>;
    @ViewChildren('selectedExpertCEDACRoles') selectedExpertCEDACRoles!: QueryList<ElementRef<HTMLInputElement>>;
    @ViewChildren('cedacRolesSelect') cedacRolesSelect!: QueryList<ElementRef<HTMLInputElement>>;
    @ViewChildren('selectedCedacRoles') selectedCedacRoles!: QueryList<ElementRef<HTMLInputElement>>;

    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'ASIGNACIÓN DE ROLES', link: '/administracion/usuarios/asignacion-roles' },
    ];
    title: string = 'Modifique los roles del usuario:';
    tooltipMessage: string | null = null;
    rolesForm: FormGroup;
    expertRoles: GroupLoadInterface[] = [];
    cedacRoles: GroupLoadInterface[] = [];
    requestResults: { [key: string]: boolean } = {};
    showLabelRequest: boolean = false;
    rpe!: string;
    isSubmitForm = false;

    justification$: Observable<string>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly fb: FormBuilder,
        private readonly functionService: FunctionService,
        private readonly alert: AlertService,
        private readonly store: Store<any>,
    ) {
        this.rolesForm = this.fb.group({
            rpe: [''],
            name: [''],
            expertRoles: [[]],
            cedacRoles: [[]],
            justification: ['', Validators.required],
        });
        this.justification$ = this.store.select(justification);
    }
    ngAfterViewInit(): void {
        this.tooltipMessage = 'Rol de experto bloqueado, debido a que tiene solicitudes en atención.';
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id'] != undefined) {
                this.rpe = params['id'];
                this.getUserData(params['id']);
                this.getExpertRoles(params['id']);
                this.getCEDACRoles(params['id']);
                this.loadRequestResults(params['id']);
            }
        });

        this.justification$.subscribe((justification) => {
            this.rolesForm.patchValue({
                justification: justification,
            });
        });
    }

    getUserData(RPEejec: string): void {
        this.userService.getUser(RPEejec).subscribe((response) => {
            this.rolesForm.patchValue({
                rpe: response.data.userDetail.rpe,
                name: response.data.userDetail.name,
            });
        });
    }

    getExpertRoles(rpe: string): void {
        this.userService.getExpertRoles(rpe).subscribe((response: ExpertRolesInterface) => {
            this.expertRoles = response.data;
            this.loadRequestResults(rpe);
        });
    }

    getCEDACRoles(rpe: string): void {
        this.userService.getCEDACRoles(rpe).subscribe((response: CedacRolesInterface) => {
            this.cedacRoles = response.data;
        });
    }

    addExpertRolesSelected(): void {
        this.expertCEDACRoles.toArray().forEach((checkbox) => {
            if (checkbox.nativeElement.checked) {
                const roleSelected = checkbox.nativeElement.value;
                this.expertRoles.forEach((role) => {
                    if (role.groupName === roleSelected) {
                        role.active = 1;
                    }
                });
            }
        });
    }

    addCedacRolesSelected(): void {
        this.cedacRolesSelect.toArray().forEach((checkbox) => {
            if (checkbox.nativeElement.checked) {
                const roleSelected = checkbox.nativeElement.value;
                this.cedacRoles.forEach((role) => {
                    if (role.groupName === roleSelected) {
                        role.active = 1;
                    }
                });
            }
        });
    }

    removeExpertRolesSelected(): void {
        this.selectedExpertCEDACRoles.toArray().forEach((checkbox) => {
            if (checkbox.nativeElement.checked) {
                const roleSelected = checkbox.nativeElement.value;
                this.expertRoles.forEach((role) => {
                    if (role.groupName === roleSelected) {
                        role.active = 0;
                    }
                });
            }
        });
    }

    removeCedacRolesSelected(): void {
        this.selectedCedacRoles.toArray().forEach((checkbox) => {
            if (checkbox.nativeElement.checked) {
                const roleSelected = checkbox.nativeElement.value;
                this.cedacRoles.forEach((role) => {
                    if (role.groupName === roleSelected) {
                        role.active = 0;
                    }
                });
            }
        });
    }

    loadRequestResults(rpe: string): void {
        const requests: Observable<boolean>[] = this.expertRoles.map((er) => this.expertWithRequest(rpe, er.groupName));

        forkJoin(requests).subscribe((results) => {
            this.expertRoles.forEach((er, index) => {
                this.requestResults[er.groupName] = results[index];
            });
        });
    }

    expertWithRequest(rpe: string, level: string): Observable<boolean> {
        return this.functionService.getRequest(rpe, level).pipe(
            map((response: HasRequestInterface) => {
                return response.data;
            }),
        );
    }

    isDisabled(er: any): boolean {
        this.showLabelRequest = true;
        return er.active === 1 && this.requestResults[er.groupName];
    }

    setJustificationArea(event: FocusEvent): void {
        const input = event.target as HTMLTextAreaElement;
        const justificationValue = input.value;

        this.store.dispatch(setJustification({ justification: justificationValue }));
    }

    onSubmit(): void {
        this.isSubmitForm = true;
        if (this.rolesForm.valid) {
            this.rolesForm.patchValue({
                expertRoles: this.expertRoles,
                cedacRoles: this.cedacRoles,
            });

            this.userService.changeUserRoles(this.rolesForm.value).subscribe((res) => {
                this.alert.mixinSuccess({ title: res.message });
            });
        }
    }
}
