import { Injectable } from '@angular/core';
import { RequestService } from '../core/services/request.service';
import { SessionService } from '../core/services/session.service';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/interface/user-response';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserRequest } from 'src/interface/user-request';
import { UserResponseInterface } from 'src/interface/user-response-interface';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url: string = environment.apiBaseUrl;

    constructor(
        private request: RequestService,
        private session: SessionService,
        private http: HttpClient,
    ) {}

    getUsers(search: string, page: number, size: number): Observable<UserResponse> {
        const params = new HttpParams().set('keyword', search).set('page', page).set('size', size);
        const url = `/users`;
        return this.request.get<UserResponse>(url, params);
    }

    getUser(rpe: string): Observable<any> {
        const route = `/users/${rpe}`;
        return this.http.get(this.url + route);
    }

    registerUser(userRequest: UserRequest): Observable<UserResponseInterface> {
        const route = `/users`;
        return this.http.post<UserResponseInterface>(this.url + route, userRequest);
    }
}
