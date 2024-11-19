import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActionButtonComponent } from '../action-button/action-button.component';
import { ActionSelectComponent } from '../action-select/action-select.component';
import { ActionCheckboxComponent } from '../action-checkbox/action-checkbox.component';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from '../pagination/pagination.component';
import { SearchComponent } from '../search/search.component';
import { TableConfig } from 'src/interface/table-config';
import { SharedModule } from 'src/shared.module';
import { PreloaderComponent } from '../preloader/preloader.component';

@Component({
    selector: 'app-table',
    standalone: true,
    imports: [
        ActionButtonComponent,
        ActionSelectComponent,
        ActionCheckboxComponent,
        CommonModule,
        PaginationComponent,
        SearchComponent,
        SharedModule,
        PreloaderComponent,
    ],
    templateUrl: './table.component.html',
    styleUrl: './table.component.css',
})
export class TableComponent {
    @Input() tableConfig!: TableConfig<any>;
    @Input() isLoading: boolean = false;

    @Output() pageChange = new EventEmitter<number>();
    @Output() searchChange = new EventEmitter<string>();
    @Output() sizeChange = new EventEmitter<number>();

    get columnCount(): number {
        return this.tableConfig.columns.length;
    }

    changePage(newPage: number) {
        this.pageChange.emit(newPage);
    }

    search(searchText: string) {
        this.searchChange.emit(searchText);
    }

    changeSize(event: Event) {
        const target = event.target as HTMLSelectElement;
        const newSize = Number(target.value);
        this.sizeChange.emit(newSize);
    }
}
