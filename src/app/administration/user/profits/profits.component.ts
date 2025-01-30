import { ResponseData } from './../../../../interface/response-data';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NgxCustomModalComponent } from 'ngx-custom-modal';
import { UserService } from 'src/app/service/user.service';
import { setSelectedProfits, setSelectedSocieties } from 'src/app/store/profits.actions';
import { BreadcrumbsInterface } from 'src/interface/breadcrumbs-interface';
import { ProfitCenterList } from 'src/interface/profit-center-list';
import { Item, ItemCascade } from 'src/interface/profit-socienty-interface';
import { SocietyInterface } from 'src/interface/society-interface';

@Component({
    selector: 'app-profits',
    standalone: false,
    templateUrl: './profits.component.html',
    styleUrl: './profits.component.css',
})
export class ProfitsComponent implements OnInit {
    @ViewChild('modalChange') modalChange!: NgxCustomModalComponent;

    isLoading = false;
    breadcrumbs: BreadcrumbsInterface[] = [
        { name: 'ADMINISTRACIÓN DE USUARIOS', link: '/administracion/usuarios' },
        { name: 'MODIFICACIÓN DE CENTROS DE BENEFICIO', link: '#' },
    ];
    storeApp: any;
    selectAllChecked = false;
    listSocieties: Item[] = [];
    selectedSocieties: Item[] = [];
    listProfits: ItemCascade[] = [];
    selectedProfits: ItemCascade[] = [];
    rpe!: string;
    role!: string;
    arrCB: string[] = [];
    arrCB_L: string[] = [];

    constructor(
        private readonly userService: UserService,
        private readonly route: ActivatedRoute,
        private readonly router: Router,
        private readonly store: Store<any>,
    ) {}

    ngOnInit(): void {
        this.initStore();
        this.route.params.subscribe((params) => {
            if (params['rpe'] != undefined) {
                this.rpe = params['rpe'];
                this.loadProfitCenterbyRpe(params['rpe']);
            }
            if (params['role'] != undefined) {
                this.role = params['role'];
            }
        });
    }

    async initStore() {
        this.store
            .select((d) => d.index)
            .subscribe((d) => {
                this.storeApp = d;
            });
    }

    loadProfitCenterbyRpe(rpe: string) {
        this.isLoading = true;
        this.userService.getProfitCenterByRpe(rpe).subscribe((res) => {
            res.data.forEach((item) => {
                this.arrCB = [...this.arrCB, item.costCenter];
                if (this.role == 'EXPERTO REGIONAL' && item.local) {
                    this.arrCB_L = [...this.arrCB, item.costCenter];
                }
            });
            this.loadSocieties();
        });
    }

    loadSocieties() {
        this.userService.getProfitCentersByList(this.arrCB).subscribe((res: ResponseData<ProfitCenterList[]>) => {
            const existingProfitValues = new Set<string | number>(res.data.map((profit) => profit.society));
            const existingProfitSelected = new Set<string | number>(res.data.map((profit) => profit.profitCenter));

            this.userService.getSocieties().subscribe((response: ResponseData<SocietyInterface[]>) => {
                this.processSocieties(response.data, existingProfitValues);
                const arrSoc = Array.from(this.selectedSocieties, (society) => society.value);
                this.fetchAndProcessProfits(arrSoc, existingProfitSelected);
            });
        });
    }

    private processSocieties(societies: SocietyInterface[], existingProfitValues: Set<string | number>) {
        societies.forEach((society) => {
            const societyEntry = { value: society.societyCode, label: `${society.societyCode} | ${society.tsociety}` };

            if (existingProfitValues.has(society.societyCode)) {
                this.selectedSocieties.push(societyEntry);
            } else {
                this.listSocieties.push(societyEntry);
            }
        });
    }

    private fetchAndProcessProfits(arrSoc: (string | number)[], existingProfitSelected: Set<string | number>) {
        this.userService.filterProfitsBySociety(arrSoc).subscribe((profitResponse: ResponseData<ProfitCenterList[]>) => {
            const existingProfitValuesSet = new Set(this.listProfits.map((profit) => profit.value));

            const newProfits = this.filterNewProfits(profitResponse.data, existingProfitSelected, existingProfitValuesSet);
            const newSelectedProfits = this.filterSelectedProfits(profitResponse.data, existingProfitSelected, existingProfitValuesSet);

            this.listProfits = [...this.listProfits, ...newProfits];
            this.selectedProfits = [...this.selectedProfits, ...newSelectedProfits];
            this.isLoading = false;
        });
    }

    private filterNewProfits(profitResponse: ProfitCenterList[], existingProfitSelected: Set<string | number>, existingProfitValuesSet: Set<string | number>) {
        return profitResponse
            .filter((profit) => !existingProfitSelected.has(profit.profitCenter))
            .filter((profit) => !existingProfitValuesSet.has(profit.profitCenter))
            .map((profit) => {
                return {
                    value: profit.profitCenter,
                    label: `${profit.profitCenter} | ${profit.tprofitCenter.trim()}`,
                    father: profit.society,
                    local: this.arrCB_L.includes(profit.profitCenter),
                };
            });
    }

    private filterSelectedProfits(
        profitResponse: ProfitCenterList[],
        existingProfitSelected: Set<string | number>,
        existingProfitValuesSet: Set<string | number>,
    ) {
        return profitResponse
            .filter((profit) => existingProfitSelected.has(profit.profitCenter))
            .filter((profit) => !existingProfitValuesSet.has(profit.profitCenter))
            .map((profit) => {
                return {
                    value: profit.profitCenter,
                    label: `${profit.profitCenter} | ${profit.tprofitCenter.trim()}`,
                    father: profit.society,
                    local: this.arrCB_L.includes(profit.profitCenter),
                };
            });
    }

    onSelectedItemsChangeSoc(selectedItems: Item[]) {
        this.selectedSocieties = selectedItems;
        const selectedSocietyValues = selectedItems.map((society) => society.value);
        this.selectedProfits = this.selectedProfits.filter((profit) => selectedSocietyValues.includes(profit.father));
        this.listProfits = this.listProfits.filter((profit) => selectedSocietyValues.includes(profit.father));
    }

    onSelectedItemsChangePro(selectedItems: ItemCascade[]) {
        this.selectedProfits = selectedItems;
    }

    onFilterProfits() {
        const arrSoc: (string | number)[] = this.selectedSocieties.map((society) => society.value);
        this.userService.filterProfitsBySociety(arrSoc).subscribe((response: ResponseData<ProfitCenterList[]>) => {
            const existingProfitValues = new Set(this.listProfits.map((profit) => profit.value));

            const newProfits = response.data
                .map((profit) => ({
                    value: profit.profitCenter,
                    label: `${profit.profitCenter} | ${profit.tprofitCenter}`,
                    father: profit.society,
                    local: this.arrCB_L.includes(profit.profitCenter),
                }))
                .filter((profit) => !existingProfitValues.has(profit.value));

            this.listProfits = [...this.listProfits, ...newProfits];
        });
    }

    toggleSelectAll() {
        this.selectAllChecked = !this.selectAllChecked;
        this.selectedProfits.forEach((item) => (item.local = this.selectAllChecked));
    }

    toggleLocal(item: ItemCascade) {
        item.local = !item.local;
        this.updateSelectAllChecked();
    }

    updateSelectAllChecked() {
        this.selectAllChecked = this.selectedProfits.every((item) => item.local);
    }

    openModal() {
        this.updateSelectAllChecked();
        this.modalChange.open();
    }

    onAccept() {
        this.store.dispatch(setSelectedSocieties({ societies: this.selectedSocieties }));
        this.store.dispatch(setSelectedProfits({ profits: this.selectedProfits }));
        this.router.navigate([`/administracion/usuarios/${this.rpe}/modificar-roles/${this.role}`]);
    }
}
