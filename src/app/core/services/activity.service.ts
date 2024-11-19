import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    private lastActivityTimestamp: number = 0;

    constructor() {
        this.updateLastActivity();
        document.addEventListener('mousemove', () => this.updateLastActivity());
        document.addEventListener('keydown', () => this.updateLastActivity());
    }

    updateLastActivity(): void {
        this.lastActivityTimestamp = new Date().getTime();
    }

    getLastActivity(): number {
        return this.lastActivityTimestamp;
    }
}
