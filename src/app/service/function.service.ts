import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HasRequestInterface } from 'src/interface/has-request-interface';

@Injectable({
    providedIn: 'root',
})
export class FunctionService {
    url: string = environment.apiBaseUrl;

    constructor(private readonly http: HttpClient) {}

    getRequest(rpe: string, level: string): Observable<HasRequestInterface> {
        const route = `/users/check-request/${rpe}/${level}`;
        return this.http.get<HasRequestInterface>(this.url + route);
    }
}
