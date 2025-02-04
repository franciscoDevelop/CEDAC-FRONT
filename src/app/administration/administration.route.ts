import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { FormComponent } from './user/form/form.component';
import { RolesComponent } from './user/roles/roles.component';
import { PrivilegesComponent } from './user/privileges/privileges.component';
import { ProfitsComponent } from './user/profits/profits.component';
import { ModulesComponent } from './user/modules/modules.component';
import { GroupComponent } from './group/group.component';
import { FormGroupComponent } from './group/form-group/form-group.component';

export const adminRoutes: Routes = [
    // Usuarios
    { path: 'usuarios', component: UserComponent, data: { title: 'Usuarios' } },
    { path: 'usuarios/nuevo', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/editar', component: FormComponent, data: { title: 'Modificar usuario' } },
    { path: 'usuarios/:id/asignar-roles', component: RolesComponent, data: { title: 'Asignar roles a usuario' } },
    { path: 'usuarios/:rpe/modificar-roles/:role', component: PrivilegesComponent, data: { title: 'Modificar roles a usuario' } },
    { path: 'usuarios/:rpe/modificar-centro-beneficio/:role', component: ProfitsComponent, data: { title: 'Modificar centros beneficio a usuario' } },
    { path: 'usuarios/:rpe/modificar-modulos/:role', component: ModulesComponent, data: { title: 'Modificar módulos a usuario' } },
    // Grupos
    { path: 'grupos', component: GroupComponent, data: { title: 'Grupos' } },
    { path: 'grupos/nuevo', component: FormComponent, data: { title: 'Crear grupo' } },
    { path: 'grupos/:id/editar', component: FormGroupComponent, data: { title: 'Modificar grupo' } },
];
