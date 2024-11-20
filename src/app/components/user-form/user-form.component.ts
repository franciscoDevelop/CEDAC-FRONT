import { CommonModule } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AlertService } from 'src/app/core/services/alert.service';
import { ProfitSocietyCenterService } from 'src/app/service/profit-society-center-service.service';
import { UserService } from 'src/app/service/user.service';
import { ProfitSocietyCenterInterface } from 'src/interface/profit-society-center-interface';

@Component({
    selector: 'app-user-form',
    standalone: true,
    imports: [ReactiveFormsModule, CommonModule, RouterModule],
    templateUrl: './user-form.component.html',
    styleUrl: './user-form.component.css',
})
export class UserFormComponent {
    @Input() title!: string;

    form!: FormGroup;
    isSubmitForm = false;

    society!: string;
    tsociety!: string;
    profitCenter!: string;
    tprofitCenter!: string;
    tcostCenter!: string;

    constructor(
        private alertService: AlertService,
        private readonly userService: UserService,
        private readonly router: Router,
        private readonly fb: FormBuilder,
        private readonly profitSocietyCenterService: ProfitSocietyCenterService,
    ) {
        this.initForm();
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
