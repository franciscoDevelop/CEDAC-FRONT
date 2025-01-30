import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AlertService } from 'src/app/core/services/alert.service';
import { UserService } from 'src/app/service/user.service';
import { justification } from 'src/app/store/selectors';
import { Adscription } from 'src/interface/adscription';
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
    title: string = 'U s u a r i o';
    rpe: string | undefined;
    user!: UserEditInterface;
    form!: FormGroup;
    sapInfo: string = '';
    sirhInfo: string = '';
    showPrivileges: boolean = false;
    adscription: Adscription = {
        society: '',
        tsociety: '',
        profitCenter: '',
        tprofitCenter: '',
        tcostCenter: '',
    };
    isSubmitForm = false;
    edit: boolean = false;
    justification$: Observable<string>;

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly fb: FormBuilder,
        private readonly alertService: AlertService,
        private readonly router: Router,
        private readonly store: Store<any>,
    ) {
        this.justification$ = this.store.select(justification);
        this.form = this.fb.group({
            rpe: ['', Validators.required],
            crpe: ['2B366'],
            name: ['', Validators.required],
            email: ['', [Validators.required, Validators.email]],
            society: [''],
            phone: [''],
            costCenter: ['', Validators.required],
            active: [true],
            autps: [false],
            autdoc: [false],
            justification: ['', Validators.required],
        });
    }

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['id'] != undefined) {
                this.rpe = params['id'];
                this.edit = true;
                this.loadUserDetail(params['id']);
            }
        });

        this.justification$.subscribe((justification) => {
            this.form.patchValue({
                justification: justification,
            });
        });
    }

    loadUserDetail(rpe: string): void {
        this.userService.getUser(rpe).subscribe((res) => {
            this.user = res.data;
            this.form.get('rpe')?.disable();

            this.form.patchValue({
                rpe: res.data.userDetail.rpe,
                name: res.data.userDetail.name,
                email: res.data.userDetail.email,
                phone: res.data.userDetail.phone,
                costCenter: !Number.isNaN(Number(res.data.userDetail.costCenter)) ? Number(res.data.userDetail.costCenter) : res.data.userDetail.costCenter,
                active: res.data.userDetail.active,
                autps: res.data.haveProfile.autPS,
                autdoc: res.data.haveProfile.autDoc,
                society: res.data.userDetail.society,
            });
            this.showPrivileges = res.data.showPrivileges;
            this.adscription.society = res.data.userDetail.society;
            this.adscription.tsociety = res.data.userDetail.tsociety;
            this.adscription.profitCenter = res.data.userDetail.profitCenter;
            this.adscription.tprofitCenter = res.data.userDetail.tprofitCenter;
            this.adscription.tcostCenter = res.data.userDetail.tcostCenter;
            this.sirhInfo = res.data.userDetail.sirh;
            this.sapInfo = res.data.userDetail.sapuser;
        });
    }

    onSubmit(): void {
        this.isSubmitForm = true;

        if (this.form.valid) {
            const phoneControl = this.form.get('phone');
            if (phoneControl && !phoneControl.value) {
                phoneControl.setValue('-');
            }
            if (this.rpe === undefined) {
                this.userService.registerUser(this.form.value).subscribe({
                    next: (res) => {
                        this.router.navigate(['/administracion/usuarios']);
                    },
                    error: (error: HttpErrorResponse) => {
                        if (error.status === 400) {
                            console.error('Bad Request:', error.message);
                        } else if (error.status === 401) {
                            console.error('Unauthorized:', error.message);
                        } else if (error.status === 500) {
                            console.error('Internal Server Error:', error.message);
                        } else if (error.status === 409) {
                            this.alertService.submitFail({ text: error.error.error });
                        } else {
                            console.error('An unexpected error occurred:', error.message);
                        }
                    },
                    complete: () => {
                        this.alertService.success();
                    },
                });
            } else {
                this.form.patchValue({
                    costCenter: this.form.get('costCenter')?.value.toString(),
                });

                this.userService.updateUser(this.rpe, this.form.value).subscribe({
                    next: (res) => {},
                    error: (error: HttpErrorResponse) => {
                        if (error.status === 400) {
                            console.error('Bad Request:', error.message);
                        } else if (error.status === 401) {
                            console.error('Unauthorized:', error.message);
                        } else if (error.status === 500) {
                            console.error('Internal Server Error:', error.message);
                        } else if (error.status === 409) {
                            this.alertService.submitFail({ text: error.error.error });
                        } else {
                            console.error('An unexpected error occurred:', error.message);
                        }
                    },
                    complete: () => {
                        this.alertService.success();
                    },
                });
            }
        }
    }
}
