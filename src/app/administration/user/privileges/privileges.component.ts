import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/service/user.service';
import { setJustification } from 'src/app/store/actions';
import { selectProfits } from 'src/app/store/profit.selectors';
import { justification, selectModules } from 'src/app/store/selectors';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { ProfitCenterList, ProfitsCenterList } from 'src/interface/profit-center-list';
import { ItemCascade } from 'src/interface/profit-socienty-interface';
import { ResponseData } from 'src/interface/response-data';
import { UserModules } from 'src/interface/user-module-list';

interface Item {
    value: string;
    label: string;
    father: string;
    local: boolean;
}

interface ItemMod {
    value: string;
    label: string;
}

@Component({
    selector: 'app-privileges',
    templateUrl: './privileges.component.html',
    styleUrl: './privileges.component.css',
})
export class PrivilegesComponent implements OnInit {
    title!: string;
    rpe!: string;
    group!: string;
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'MODIFICACIÓN DE ROLES', link: '#' },
    ];
    form!: FormGroup;
    role!: string;
    listOne!: string;
    listTwo: string = 'MÓDULOS';
    listThree: string = 'NIVELES';

    arrCB: string[] = [];
    arrCB_L: string[] = [];
    arrMOD: string[] = [];
    Lista_selCBs_Actual!: string;
    Lista_selCBs_Propuesta!: string;
    Lista_selCBsLocales_Actual!: string;

    listProfits: Item[] = [];
    listModules: ItemMod[] = [];

    isSubmitForm: boolean = false;
    isLoading: boolean = false;

    selectedModules$: Observable<ItemMod[]>;
    selectedProfits$: Observable<ItemCascade[]>;
    justification$: Observable<string>;

    userInfo!: string;
    societyInfo!: string;
    profitCenterInfo!: string;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly fb: FormBuilder,
        private readonly userService: UserService,
        private readonly store: Store<any>,
        private readonly alert: AlertService,
        private readonly router: Router,
    ) {
        this.initForm();
        // Accede al estado directamente
        this.selectedProfits$ = this.store.select(selectProfits);
        this.selectedModules$ = this.store.select(selectModules);
        this.justification$ = this.store.select(justification);
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['rpe'] != undefined) {
                this.rpe = params['rpe'];
                this.loadUserDetail(params['rpe']);
                this.loadProfitCenters(params['rpe']);
                this.loadUserModules(params['rpe']);
            }
            if (params['role'] != undefined) {
                this.listOne = params['role'] === 'EXPERTO REGIONAL' ? 'SOC - CB [+ LOCAL ] | Descripción' : 'SOC - CB | Descripción';
                this.role = params['role'];
                this.title = 'Role - ' + params['role'];
                this.form.patchValue({
                    role: params['role'],
                });
            }
        });

        this.justification$.subscribe((justification) => {
            this.form.patchValue({
                justification: justification,
            });
        });

        this.updateInternalProcess();
    }

    initForm() {
        this.form = this.fb.group({
            role: [''],
            internalProcess: [false],
            levelDown: [false],
            scale: [false],
            solve: [false],
            supervisor: [false],
            administration: [false],
            forumGmcAccess: [false],
            justification: ['', Validators.required],
            listProfits: [null],
            listModules: [null],
        });
    }

    loadUserDetail(rpe: string): void {
        this.userService.getUser(rpe).subscribe((res) => {
            this.userInfo = res.data.userDetail.name;
            this.societyInfo = `[${res.data.userDetail.society}] ${res.data.userDetail.tsociety}`;
            this.profitCenterInfo = `[${res.data.userDetail.profitCenter}] ${res.data.userDetail.tprofitCenter}`;

            this.form.patchValue({
                internalProcess: res.data.haveProfile.internalProcess,
                levelDown: res.data.haveProfile.levelDown,
                scale: res.data.haveProfile.scale,
                solve: res.data.haveProfile.solve,
                supervisor: res.data.userDetail.supervisor,
                administration: res.data.haveProfile.administration,
            });
        });
    }

    loadProfitCenters(rpe: string) {
        this.isLoading = true; // Comienza el estado de carga

        this.userService.getProfits(rpe).subscribe((res: ResponseData<ProfitsCenterList[]>) => {
            this.updateListProfits(res.data);
            this.isLoading = false; // Finaliza el estado de carga
        });
    }

    private updateListModules(res: UserModules[]) {
        this.selectedModules$.subscribe((selectedModules) => {
            if (selectedModules && selectedModules.length > 0) {
                this.listModules = selectedModules.map((item) => ({
                    value: item.value,
                    label: item.label,
                }));
            } else {
                this.listModules = res.map((item) => ({
                    value: item.code,
                    label: `${item.code} (${item.name})`,
                }));
            }
        });
    }

    private updateListProfits(res: ProfitsCenterList[]) {
        this.selectedProfits$.subscribe((selectedProfits) => {
            // Comprobamos la longitud del array
            if (selectedProfits && selectedProfits.length > 0) {
                this.assignSelectedProfits(selectedProfits);
            } else {
                this.listProfits = res.map((item) => ({
                    value: String(item.profitCenter),
                    label: item.tprofitCenter,
                    father: String(item.society),
                    local: item.local,
                }));
            }
        });
    }

    isLocal(data: ProfitCenterList) {
        let local: boolean;

        if (this.role === 'EXPERTO REGIONAL') {
            local = this.arrCB_L.some((l) => {
                return data.profitCenter.trim() == l;
            });
        } else {
            local = false;
        }

        return local;
    }

    updateInternalProcess(): void {
        if (this.role === 'EXPERTO ASARE' || this.role === 'EXPERTO NORMATIVO') {
            this.form.patchValue({
                internalProcess: true,
            });
        }
    }

    checkDisabled() {
        return this.role === 'EXPERTO ASARE' || this.role === 'EXPERTO NORMATIVO';
    }

    isHiden() {
        let hidden = false;
        if (this.role !== 'COORDINACION' && this.role !== 'EXPERTO LOCAL' && this.role !== 'EXPERTO REGIONAL') {
            hidden = true;
        }
        return hidden;
    }

    private assignSelectedProfits(selectedProfits: ItemCascade[]) {
        this.listProfits = selectedProfits.map((item) => ({
            value: String(item.value),
            label: item.label.split('|')[1].trim(),
            father: String(item.father),
            local: item.local,
        }));
    }

    getProfitName(data: ItemCascade) {
        let label;

        if (data.local) {
            label = `${data.father} - ${data.value} + LOCAL | ${data.label}`;
        } else {
            label = `${data.father} - ${data.value} | ${data.label}`;
        }

        return label;
    }

    loadUserModules(rpe: string) {
        this.userService.getUmodules(rpe).subscribe((res: ResponseData<UserModules[]>) => {
            this.updateListModules(res.data);
        });
    }

    onChageAdminUser(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (inputElement.checked) {
            this.form.patchValue({
                supervisor: true,
            });
        } else {
            this.form.patchValue({
                supervisor: false,
            });
        }
    }

    onChangeSupervisor(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        if (!inputElement.checked) {
            this.form.patchValue({
                administration: false,
            });
        }
    }

    setJustificationArea(event: FocusEvent): void {
        const input = event.target as HTMLTextAreaElement;
        const justificationValue = input.value;

        this.store.dispatch(setJustification({ justification: justificationValue }));
    }

    onSubmit(): void {
        this.isSubmitForm = true;
        if (this.form.valid) {
            this.form.patchValue({
                listProfits: this.listProfits,
                listModules: this.listModules,
            });

            this.userService.savePrivileges(this.rpe, this.form.value).subscribe((res) => {
                this.alert.success();
                this.router.navigate([`/administracion/usuarios/${this.rpe}/editar`]);
            });
        }
    }
}
