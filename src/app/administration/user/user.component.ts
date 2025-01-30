import { UserWithActionsInterface } from 'src/interface/user-with-actions-interface';
import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { UserService } from 'src/app/service/user.service';
import { TableConfig } from 'src/interface/table-config';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { Router } from '@angular/router';
import { PagedUserResponse } from 'src/interface/paged-user';
import { ResponseData } from 'src/interface/response-data';
import { SearchService } from 'src/app/service/search.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrl: './user.component.css',
})
export class UserComponent implements AfterViewInit {
    breadcrumbs: BreadcrumbsInterface[] = [{ name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' }];
    userTableConfig: TableConfig<UserWithActionsInterface[]> = {
        title: 'Usuarios',
        columns: [
            { label: 'RPE', identifier: 'rpe' },
            { label: 'NOMBRE', identifier: 'name' },
            { label: 'ACTIVO', identifier: 'active' },
            { label: this.sanitizer.bypassSecurityTrustHtml('ADSCRIPCIÓN <br> (Sociedad - CentroBeneficio - CentroCosto)'), identifier: 'secondment' },
            { label: 'ROLES', identifier: 'roles' },
            { label: 'ACCIONES', identifier: 'actions' },
        ],
        data: [],
        pagination: { number: 1, totalPages: 0, totalElements: 0, size: 10 },
        search: { show: true, placeholder: 'Buscar...', searchText: '' },
        button: { label: 'Nuevo usuario', color: 'bg-success', icon: 'plus', link: '/administracion/usuarios/nuevo', show: true },
        show: {
            defaultSize: 10,
            sizes: [10, 20, 50, 100],
        },
    };
    isLoading: boolean = false;

    constructor(
        private readonly userService: UserService,
        private readonly sanitizer: DomSanitizer,
        private readonly router: Router,
        private readonly cdr: ChangeDetectorRef,
        private readonly searchService: SearchService
    ) {}

    ngAfterViewInit() {
        this.loadData();
        this.cdr.detectChanges(); // Marcar el componente para la detección de cambios
    }

    loadData() {
        this.isLoading = true;
        const { number, size } = this.userTableConfig.pagination;
        // const { searchText } = this.userTableConfig.search;

        this.userTableConfig.search.searchText = this.searchService.getSearchText();
        console.log('searchText', this.searchService.getSearchText());


        this.userService.getUsers(this.searchService.getSearchText(), number, size).subscribe((response: ResponseData<PagedUserResponse>) => {
            this.userTableConfig.data = response.data.users.map((item) => ({
                ...item,
                rpe: item.rpe.toUpperCase(),
                roles: this.separateRoles(item.roles),
                badge: this.getBadge(item.active),
                actions: [{ tooltip: 'Editar', type: 'button', icon: 'edit', action: () => this.editUser(item.rpe) }],
            })) as UserWithActionsInterface[];
            this.userTableConfig.pagination = {
                number: response.data.pageNumber,
                size: response.data.pageSize,
                totalElements: response.data.totalItems,
                totalPages: response.data.totalPages,
            };
            this.isLoading = false;
        });
    }

    onPageChange(newPage: number) {
        this.userTableConfig.pagination.number = newPage;
        this.loadData();
    }

    onSearchChange(searchText: string) {
        this.userTableConfig.pagination.number = 1;
        this.userTableConfig.search.searchText = searchText;
        this.searchService.setSearchText(searchText);
        this.loadData();
    }

    onSizeChange(newSize: number) {
        this.userTableConfig.pagination.size = newSize;
        this.loadData();
    }

    separateRoles(roles: string | SafeHtml): SafeHtml {
        if (typeof roles === 'string') {
            return this.sanitizer.bypassSecurityTrustHtml(roles.split(',').join('<br>'));
        }
        return roles;
    }

    getBadge(status: string) {
        switch (status) {
            case 'ACTIVO':
                return { text: 'ACTIVO', class: 'badge-outline-success' };
            case 'INACTIVO':
                return { text: 'INACTIVO', class: 'badge-outline-danger' };
            default:
                return { text: 'Unknown', class: 'badge-outline-primary' };
        }
    }

    editUser(id: string) {
        this.router.navigate([`/administracion/usuarios/${id.trim()}/editar`]);
    }
}
