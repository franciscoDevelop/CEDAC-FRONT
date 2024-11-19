import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class LoadingService {
    private readonly _isLoading = new BehaviorSubject<any>({ show: true });
    public isLoading = this._isLoading.asObservable();

    constructor() {}

    show_dark(alpha: number = 0.7) {
        this.show({ bg_color: 'rgba(0, 0, 0, ' + alpha + ')' });
    }

    show(cfg: any = {}) {
        cfg.show = true;
        cfg.bg_color = cfg.bg_color || 'rgba(255, 255, 255, 1)';
        this._isLoading.next(cfg);
    }

    hide(cfg: any = {}) {
        cfg.show = false;
        cfg.bg_color = 'rgba(255, 255, 255, 1)';
        this._isLoading.next(cfg);
    }
}
