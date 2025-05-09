import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { isJwtExpired, verifyJwtSignature } from 'src/app/utils/jwt.utils';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root' })
export class AuthService {
    private url: string = environment.apiBaseUrl;
    private inactivityTimeout: any;
    private lastActivity = Date.now();
    private readonly INACTIVITY_LIMIT = 10 * 60 * 1000; // 10 min

    private readonly publicKey = 'OGFhZGE4YjU1MTUwYTVjYmE2YWUwNzQwZGEyYjU5MDE=';

    constructor(
        private http: HttpClient,
        private router: Router,
    ) {
        this.initActivityWatcher();
    }

    login(credentials: { username: string; password: string }) {
        return this.http.post(`${this.url}/auth/login`, credentials).pipe(
            tap((res: any) => {
                sessionStorage.setItem('access_token', res.accessToken);
                sessionStorage.setItem('refresh_token', res.refreshToken);
            }),
        );
    }

    logout() {
        sessionStorage.clear();
        this.router.navigate(['/auth/login']);
    }

    async isLoggedIn(): Promise<boolean> {
        const token = sessionStorage.getItem('access_token');
        if (!token) {
            return false;
        }
        return await this.isTokenValid(token);
    }

    getAccessToken() {
        return sessionStorage.getItem('access_token');
    }

    refreshToken(): Observable<any> {
        const refresh = sessionStorage.getItem('refresh_token');
        return this.http.post('/api/refresh-token', { refresh });
    }

    async isTokenValid(token: string): Promise<boolean> {
        try {
            const verified = await verifyJwtSignature(token, this.publicKey);
            return !!verified && !isJwtExpired(token);
        } catch {
            return false;
        }
    }

    initActivityWatcher() {
        const resetTimer = () => {
            this.lastActivity = Date.now();
            clearTimeout(this.inactivityTimeout);
            this.inactivityTimeout = setTimeout(() => {
                this.logout();
                alert('Sesión cerrada por inactividad.');
            }, this.INACTIVITY_LIMIT);
        };
        ['mousemove', 'click', 'keydown'].forEach((event) => document.addEventListener(event, resetTimer));

        resetTimer();
    }
}
