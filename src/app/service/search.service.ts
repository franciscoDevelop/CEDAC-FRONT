import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SearchService {
    private search: string = '';

    setSearchText(search: string): void {
        this.search = search;
    }

    getSearchText(): string {
        return this.search;
    }

    clearSearchText(): void {
        this.search = '';
    }
}
