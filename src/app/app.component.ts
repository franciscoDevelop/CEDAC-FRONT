import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { AuthService } from './core/auth/auth.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly titleService: Title,
        private auth: AuthService,
    ) {
        this.router.events
            .pipe(
                filter((event) => event instanceof NavigationEnd),
                map(() => this.activatedRoute),
                map((route) => {
                    while (route.firstChild) route = route.firstChild;
                    return route;
                }),
                filter((route) => route.outlet === 'primary'),
                switchMap((route) => {
                    return route.data.pipe(
                        map((routeData: any) => {
                            const title = routeData['title'];
                            return { title };
                        }),
                    );
                }),
                tap((data: any) => {
                    let title = data.title;
                    title = (title ? title + ' | ' : '') + 'CEDAC';
                    this.titleService.setTitle(title);
                }),
            )
            .subscribe();
    }

    async ngOnInit() {
        const token = sessionStorage.getItem('access_token');
        if (token) {
            const isValid = await this.auth.isTokenValid(token);
            if (!isValid) {
                this.auth.logout();
            }
        }
    }
}
