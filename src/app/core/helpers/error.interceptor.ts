import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SessionService } from '../services/session.service';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(
        private session: SessionService,
        private router: Router,
    ) {}

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(
            catchError((err) => {
                console.log('error HttpRequest: ', err.name, err);
                if (err.status === 401) {
                    this.session.drop();
                    location.reload();
                    //this.session.recoverySession({url:this.router.url});
                } else {
                    this.session.showError(err);
                }

                const error = err.error.message || err.statusText;
                return throwError(error);
            }),
        );
    }
}
