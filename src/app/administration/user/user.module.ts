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

const routes: Routes = [
    {
        path: 'usuarios',
        component: UserComponent,
        data: { title: 'Usuarios' },
    },
    { path: 'usuarios/nuevo', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/editar', component: FormComponent, data: { title: 'Modificar usuario' } },
];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, TableComponent, ComponentsModule, SharedModule.forRoot(), UserFormComponent],
    declarations: [UserComponent, BreadcrumbComponent, FormComponent],
})
export class UserModule {}
