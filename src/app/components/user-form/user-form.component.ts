import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProfitSocietyCenterService } from 'src/app/service/profit-society-center-service.service';
import { setJustification } from 'src/app/store/actions';
import { Adscription } from 'src/interface/adscription';
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
    @Input() showPrivileges!: boolean;
    @Input() edit!: boolean;
    @Input() sapInfo!: string;
    @Input() sirhInfo!: string;
    @Input() adscription!: Adscription;
    @Input() form!: FormGroup;
    @Input() isSubmitForm!: boolean;

    @Output() onSubmitForm: EventEmitter<FormGroup> = new EventEmitter<FormGroup>();

    constructor(
        private readonly profitSocietyCenterService: ProfitSocietyCenterService,
        private readonly store: Store<any>,
    ) {}

    loadCostCenter(event: FocusEvent): void {
        const input = event.target as HTMLInputElement;
        const costCenterValue = input.value;

        this.profitSocietyCenterService.getProfitSocietyCenter(costCenterValue).subscribe((response: ProfitSocietyCenterInterface) => {
            this.adscription.society = response.society;
            this.adscription.tsociety = response.tsociety;
            this.adscription.profitCenter = response.profitCenter;
            this.adscription.tprofitCenter = response.tprofitCenter;
            this.adscription.tcostCenter = response.tcostCenter;
            this.form.patchValue({
                society: response.society,
            });
        });
    }

    setJustificationArea(event: FocusEvent): void {
        const input = event.target as HTMLTextAreaElement;
        const justificationValue = input.value;

        this.store.dispatch(setJustification({ justification: justificationValue }));
    }

    onSubmit(): void {
        this.onSubmitForm.emit(this.form);
    }
}
