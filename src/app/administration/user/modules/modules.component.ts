import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/service/user.service';
import { setSelectedModules } from 'src/app/store/actions';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { Item } from 'src/interface/profit-socienty-interface';
import { UserModuleList } from 'src/interface/user-module-list';

@Component({
    selector: 'app-modules',
    templateUrl: './modules.component.html',
    styleUrl: './modules.component.css',
})
export class ModulesComponent implements OnInit {
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'MODIFICACIÓN DE MÓDULOS', link: '#' },
    ];
    isLoading: boolean = false;
    rpe!: string;
    role!: string;
    listModules: Item[] = [];
    selectedModules: Item[] = [];
    arrMOD: string[] = [];

    constructor(
        private readonly route: ActivatedRoute,
        private readonly userService: UserService,
        private readonly store: Store<any>,
        private readonly router: Router,
    ) {}

    ngOnInit(): void {
        this.route.params.subscribe((params) => {
            if (params['rpe'] != undefined) {
                this.rpe = params['rpe'];
            }
            if (params['role'] != undefined) {
                this.role = params['role'];
            }
        });
        this.loadModules();
        this.getModules(this.rpe);
    }

    loadModules() {
        this.userService.getAllModules().subscribe((res) => {
            this.listModules = res.data.map((item: UserModuleList) => {
                return {
                    value: item.moduleCode,
                    label: `${item.moduleCode} (${item.moduleName})`,
                };
            });
        });
    }

    getModules(rpe: string) {
        this.userService.getModulesByRpe(rpe).subscribe((res) => {
            res.data.forEach((item) => {
                this.arrMOD = [...this.arrMOD, item.module];
            });
            this.loadUserModules();
        });
    }

    loadUserModules() {
        if (this.listModules && this.arrMOD) {
            this.selectedModules = this.listModules.filter(module => {
                return this.arrMOD.includes(String(module.value))
            });
        }
    }

    onSelectedItemsChangeMod(selectedItems: any[]) {
        this.selectedModules = selectedItems;
    }

    onAccept() {
        this.store.dispatch(setSelectedModules({ modules: this.selectedModules }));
        this.router.navigate([`/administracion/usuarios/${this.rpe}/modificar-roles/${this.role}`]);
    }
}
