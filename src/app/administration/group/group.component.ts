import { Component, OnInit } from '@angular/core';
import { GroupService } from 'src/app/service/group.service';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { GroupInterface } from 'src/interface/group-interface';

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrl: './group.component.css',
})
export class GroupComponent implements OnInit {
    breadcrumbs: BreadcrumbsInterface[] = [{ name: 'ADMINISTRACIÓN DE GRUPOS', link: '/administracion/grupos' }];
    tableData: GroupInterface[] = [];

    constructor(private readonly groupService: GroupService) {}

    ngOnInit(): void {
        this.loadGroups();
    }

    loadGroups() {
        this.groupService.getGroups().subscribe((response) => {
            this.tableData = response.data;
        });
    }
}
