import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProfitSocietyCenterService } from 'src/app/service/profit-society-center-service.service';
import { UserService } from 'src/app/service/user.service';
import { ProfitSocietyCenterInterface } from 'src/interface/profit-society-center-interface';
import { UserEditInterface } from 'src/interface/user-edit-interface';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent implements OnChanges {
    @Input() title!: string;
    @Input() userDetail!: UserEditInterface;
    @Input() userRpe!: string | undefined;

    form!: FormGroup;
    isSubmitForm = false;

    society!: string;
    tsociety!: string;
    profitCenter!: string;
    tprofitCenter!: string;
    tcostCenter!: string;
    sapInfo!: string;
    sirhInfo!: string;

    constructor(
        private alertService: AlertService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly profitSocietyCenterService: ProfitSocietyCenterService,
    ) {
        this.initForm();
    }
    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userDetail'] && changes['userDetail'].currentValue) {

            this.form.get('user.rpe')?.disable();
            this.form.patchValue({
                user: {
                    rpe: this.userRpe,
                    name: this.userDetail.data.user.name,
                    email: this.userDetail.data.user.email,
                    phone: this.userDetail.data.user.phone,
                    costCenter: !Number.isNaN(Number(this.userDetail.data.user.costCenter))
                        ? Number(this.userDetail.data.user.costCenter)
                        : this.userDetail.data.user.costCenter,
                    active: this.userDetail.data.user.active === 1,
                },
            });
            this.society = this.userDetail.data.user.society;
            this.tsociety = this.userDetail.data.user.tsociety;
            this.profitCenter = this.userDetail.data.user.profitCenter;
            this.tprofitCenter = this.userDetail.data.user.tprofitCenter;
            this.tcostCenter = this.userDetail.data.user.tcostCenter;
            this.sirhInfo = this.userDetail.data.user.sirh;
            this.sapInfo = this.userDetail.data.user.sapuser;
        } else {
            this.form.reset();
        }
    }

    initForm() {
        this.form = this.fb.group({
            user: this.fb.group({
                rpe: ['', Validators.required],
                coordinatorRPE: ['2B366'],
                name: ['', Validators.required],
                email: ['', [Validators.required, Validators.email]],
                society: [''],
                phone: [''],
                costCenter: ['', Validators.required],
                active: [true],
            }),
            justification: ['', Validators.required],
        });
    }

    loadCostCenter(event: FocusEvent): void {
        const input = event.target as HTMLInputElement;
        const costCenterValue = input.value;
        // Add your logic to handle the cost center value
        this.profitSocietyCenterService.getProfitSocietyCenter(costCenterValue).subscribe((response: ProfitSocietyCenterInterface) => {
            this.society = response.society;
            this.tsociety = response.tsociety;
            this.profitCenter = response.profitCenter;
            this.tprofitCenter = response.tprofitCenter;
            this.tcostCenter = response.tcostCenter;
            this.form.patchValue({
                user: {
                    society: response.society,
                },
            });
        });
    }

    onSubmit(): void {
        this.isSubmitForm = true;
        if (this.form.valid) {
            const phoneControl = this.form.get('user.phone');
            if (phoneControl && !phoneControl.value) {
                phoneControl.setValue('-');
            }
            this.userService.registerUser(this.form.value).subscribe(
                (res) => {
                    this.alertService.success();
                    this.router.navigate(['/administracion/usuarios']);
                },
                (error: HttpErrorResponse) => {
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
            );
        }
    }
}
