import { Injectable } from '@angular/core';
import { RequestService } from '../core/services/request.service';
import { SessionService } from '../core/services/session.service';
import { Observable } from 'rxjs';
import { UserResponse } from 'src/interface/user-response';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    constructor(
        private request: RequestService,
        private session: SessionService,
    ) {}

    getUsers(search: string, page: number, size: number): Observable<UserResponse> {
        const params = new HttpParams().set('keyword', search).set('page', page).set('size', size);
        const url = `/users`;
        return this.request.get<UserResponse>(url, params);
    }
}
