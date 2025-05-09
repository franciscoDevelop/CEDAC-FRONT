import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.auth.getAccessToken();

        let request = req;
        if (token) {
            request = req.clone({
                setHeaders: {
                    Authorization: `Bearer ${token}`,
                },
            });
        }

        return next.handle(request).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    return this.auth.refreshToken().pipe(
                        switchMap((res: any) => {
                            sessionStorage.setItem('access_token', res.accessToken);
                            const clonedReq = req.clone({
                                setHeaders: { Authorization: `Bearer ${res.accessToken}` },
                            });
                            return next.handle(clonedReq);
                        }),
                        catchError((err) => {
                            this.auth.logout();
                            return throwError(() => err);
                        }),
                    );
                }
                return throwError(() => error);
            }),
        );
    }
}
