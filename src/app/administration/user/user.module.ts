import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { SharedModule } from 'src/shared.module';
import { BreadcrumbComponent } from 'src/app/components/breadcrumb/breadcrumb.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { TableComponent } from 'src/app/components/table/table.component';
import { FormComponent } from './form/form.component';
import { UserFormComponent } from 'src/app/components/user-form/user-form.component';
import { UserAddRolesComponent } from 'src/app/components/user-add-roles/user-add-roles.component';
import { RolesComponent } from './roles/roles.component';

const routes: Routes = [
    {
        path: 'usuarios',
        component: UserComponent,
        data: { title: 'Usuarios' },
    },
    { path: 'usuarios/nuevo', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/editar', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/asignar-roles', component: RolesComponent, data: { title: 'Asignar roles a usuario' } },
    { path: 'usuarios/:id/modificar-roles', component: RolesComponent, data: { title: 'Modificar roles a usuario' } },
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
    ],
    declarations: [UserComponent, FormComponent, RolesComponent],
})
export class UserModule {}
