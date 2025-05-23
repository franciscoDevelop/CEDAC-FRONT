import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private auth: AuthService,
        private router: Router,
    ) {}

    async canActivate(): Promise<boolean | UrlTree> {
        if (await this.auth.isLoggedIn()) {
            return true;
        }
        return this.router.parseUrl('/auth/login');
    }
}
