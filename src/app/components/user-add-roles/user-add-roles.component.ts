import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { UserEditInterface } from 'src/interface/user-edit-interface';
import { SharedModule } from 'src/shared.module';

@Component({
    selector: 'app-user-add-roles',
    standalone: true,
    imports: [CommonModule, NgxTippyModule, SharedModule, RouterLink],
    templateUrl: './user-add-roles.component.html',
    styleUrl: './user-add-roles.component.css',
})
export class UserAddRolesComponent implements OnChanges {
    @Input() userDetail!: UserEditInterface;
    @Input() userRpe: string | undefined;

    roles!: { rpe: string; groupUser: string }[];

    constructor() {}

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['userDetail']?.currentValue) {
            this.roles = this.userDetail.roles;
        }
    }

    showButton(group: string) {
        return group.startsWith('EXPERTO') || group === 'COORDINACION';
    }
}
