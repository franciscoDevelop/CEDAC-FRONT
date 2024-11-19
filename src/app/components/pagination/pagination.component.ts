import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { IconModule } from 'src/app/shared/icon/icon.module';
import { PaginationInterface } from 'src/interface/pagination-interface';

@Component({
    selector: 'app-pagination',
    standalone: true,
    imports: [IconModule, CommonModule, NgxPaginationModule, FormsModule],
    templateUrl: './pagination.component.html',
    styleUrl: './pagination.component.css',
})
export class PaginationComponent {
    @Input() paginationConfig!: PaginationInterface;
    @Output() changePage = new EventEmitter<number>();

    onPageChange(page: number) {
        if (page >= 0 && page < this.paginationConfig.totalPages) {
            if (this.paginationConfig.number !== page) {
                this.paginationConfig.number = page;
                this.changePage.emit(page);
            }
        }
    }

    get pages(): number[] {
        const pages: number[] = [];

        const startPage = Math.max(this.paginationConfig.number - 1, 0);
        const endPage = Math.min(this.paginationConfig.number + 1, this.paginationConfig.totalPages - 1);

        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }

        return pages;
    }
}
