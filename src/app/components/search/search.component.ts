import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared.module';

@Component({
    selector: 'app-search',
    standalone: true,
    imports: [CommonModule, FormsModule, SharedModule],
    templateUrl: './search.component.html',
    styleUrl: './search.component.css',
})
export class SearchComponent {
    @Input() placeholder!: string;
    @Input() searchText!: string;
    @Output() search = new EventEmitter<string>();

    focus: boolean;

    constructor() {
        if (this.searchText == '') {
            this.focus = false;
        } else {
            this.focus = true;
        }
    }

    onSearch(event: Event) {
        event.preventDefault();
        this.search.emit(this.searchText);
    }
}
