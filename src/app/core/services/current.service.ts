import { Injectable } from '@angular/core';
import { NavigationStart, Router } from '@angular/router';
import { BehaviorSubject, Subscription } from 'rxjs';
import { UserCurrent } from '../interface/current-interface';

@Injectable({
    providedIn: 'root',
})
export class CurrentService {
    private readonly timeSource = new BehaviorSubject<any>([] as any);
    private readonly changeSource = new BehaviorSubject<any>([] as any);
    private readonly userSource = new BehaviorSubject<UserCurrent>({} as UserCurrent);

    timeCurrent = this.timeSource.asObservable();
    changeCurrent = this.changeSource.asObservable();
    userCurrent = this.userSource.asObservable();

    public subscriptions: { [key: string]: Subscription } = {};

    constructor(private readonly router: Router) {}

    changeUser(user: UserCurrent) {
        this.userSource.next(user);
    }

    change(data: any) {
        this.changeSource.next(data);
    }

    changeTime() {
        const ff = new Date();
        const dd = String(ff.getDate()).padStart(2, '0');
        const mm = String(ff.getMonth() + 1).padStart(2, '0'); // +1 porque getMonth() devuelve 0-11
        const aaaa = ff.getFullYear();
        const hh = String(ff.getHours()).padStart(2, '0');
        const ii = String(ff.getMinutes()).padStart(2, '0');
        const ss = String(ff.getSeconds()).padStart(2, '0');
        this.timeSource.next(`${dd}/${mm}/${aaaa} ${hh}:${ii}:${ss}`);
    }

    createSubscription(name: string, subFx: Function) {
        name = name.replace(/[^a-zA-Z0-9]/g, '');
        const id = name + '_route_';
        if (this.subscriptions[id]) return;
        subFx('init');
        this.subscriptions[id] = this.router.events.subscribe((event) => {
            if (event instanceof NavigationStart && event?.url.replace(/[^a-zA-Z0-9]/g, '') == name) {
                subFx(event);
            }
        });
    }

    destroySubscription(name: string) {
        name = name.replace(/[^a-zA-Z0-9]/g, '') + '_route_';
        if (this.subscriptions[name]) {
            this.subscriptions[name].unsubscribe();
        }
    }

    navigate(url: any) {
        this.router.navigate(typeof url == 'string' ? [url] : url);
    }
}
