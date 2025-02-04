import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FormComponent } from './user/form/form.component';
import { RolesComponent } from './user/roles/roles.component';
import { PrivilegesComponent } from './user/privileges/privileges.component';
import { ProfitsComponent } from './user/profits/profits.component';
import { ModulesComponent } from './user/modules/modules.component';
import { BreadcrumbComponent } from '../components/breadcrumb/breadcrumb.component';
import { TableComponent } from '../components/table/table.component';
import { ComponentsModule } from '../components/components.module';
import { SharedModule } from 'src/shared.module';
import { UserFormComponent } from '../components/user-form/user-form.component';
import { UserAddRolesComponent } from '../components/user-add-roles/user-add-roles.component';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { DualListComponent } from '../components/dual-list/dual-list.component';
import { LoaderComponent } from '../components/loader/loader.component';
import { adminRoutes } from './administration.route';
import { GroupComponent } from './group/group.component';
import { FormGroupComponent } from './group/form-group/form-group.component';
import { CheckboxGridComponent } from '../components/checkbox-grid/checkbox-grid.component';

@NgModule({
    imports: [
        RouterModule.forChild(adminRoutes),
        BreadcrumbComponent,
        CommonModule,
        TableComponent,
        ComponentsModule,
        SharedModule.forRoot(),
        UserFormComponent,
        UserAddRolesComponent,
        NgxTippyModule,
        DualListComponent,
        LoaderComponent,
        RouterLink,
        CheckboxGridComponent,
    ],
    declarations: [UserComponent, FormComponent, RolesComponent, PrivilegesComponent, ProfitsComponent, ModulesComponent, GroupComponent, FormGroupComponent],
})
export class AdministrationModule {}
