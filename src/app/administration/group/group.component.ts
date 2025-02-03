import { Component } from '@angular/core';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrl: './group.component.css',
})
export class GroupComponent {
    breadcrumbs: BreadcrumbsInterface[] = [{ name: 'ADMINISTRACIÓN DE GRUPOS', link: '/administracion/grupos' }];
    tableData = [
        {
            id: 1,
            name: 'John Doe',
            email: 'johndoe@yahoo.com',
            date: '10/08/2020',
            sale: 120,
            status: 'Complete',
            register: '5 min ago',
            progress: '40%',
            position: 'Developer',
            office: 'London',
        },
    ];
}
