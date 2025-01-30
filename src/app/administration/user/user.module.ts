import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/shared.module';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormComponent } from './form/form.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { UserAddRolesComponent } from 'src/app/components/user-add-roles/user-add-roles.component';
import { RolesComponent } from './roles/roles.component';
import { NgxTippyModule } from 'ngx-tippy-wrapper';
import { PrivilegesComponent } from './privileges/privileges.component';
import { ProfitsComponent } from './profits/profits.component';
import { DualListComponent } from 'src/app/components/dual-list/dual-list.component';
import { LoaderComponent } from 'src/app/components/loader/loader.component';
import { StoreModule } from '@ngrx/store';
import { profitsReducer } from 'src/app/store/profit.reducer';
import { ModulesComponent } from './modules/modules.component';
import { justificationReducer } from 'src/app/store/reducers';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UserComponent,
        data: { title: 'Usuarios' },
    },
    { path: 'usuarios/nuevo', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/editar', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/asignar-roles', component: RolesComponent, data: { title: 'Asignar roles a usuario' } },
    { path: 'usuarios/:rpe/modificar-roles/:role', component: PrivilegesComponent, data: { title: 'Modificar roles a usuario' } },
    { path: 'usuarios/:rpe/modificar-centro-beneficio/:role', component: ProfitsComponent, data: { title: 'Modificar centros beneficio a usuario' } },
    { path: 'usuarios/:rpe/modificar-modulos/:role', component: ModulesComponent, data: { title: 'Modificar módulos a usuario' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
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
        StoreModule.forFeature('profits', profitsReducer),
        StoreModule.forFeature('justification', justificationReducer),
    ],
    declarations: [UserComponent, FormComponent, RolesComponent, PrivilegesComponent, ProfitsComponent, ModulesComponent],
})
export class UserModule {}
