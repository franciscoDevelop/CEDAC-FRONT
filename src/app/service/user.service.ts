import { Injectable } from '@angular/core';
import { RequestService } from '../core/services/request.service';
import { SessionService } from '../core/services/session.service';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { UserRequest } from 'src/interface/user-request';
import { UserResponseInterface } from 'src/interface/user-response-interface';
import { environment } from 'src/environments/environment';
import { UserEditInterface } from 'src/interface/user-edit-interface';
import { ExpertRolesInterface } from 'src/interface/expert-roles-interface';
import { CedacRolesInterface } from 'src/interface/cedac-roles-interface';
import { UserRolesInterface } from 'src/interface/user-roles-interface';
import { ResInterface } from 'src/interface/res-interface';
import { PrivilegesUserInterface } from 'src/interface/privileges-by-rpe-interface';
import { UserDivision } from 'src/interface/user-division';
import { ProfitCenterList, ProfitsCenterList } from 'src/interface/profit-center-list';
import { UserModuleRequest } from 'src/interface/user-module-request';
import { UserModuleList, UserModules } from 'src/interface/user-module-list';
import { SocietyInterface } from 'src/interface/society-interface';
import { ResponseData } from 'src/interface/response-data';
import { PagedUserResponse } from 'src/interface/paged-user';
import { UserPrivilegesRequest } from 'src/interface/user-privileges-request';

@Injectable({
    providedIn: 'root',
})
export class UserService {
    url: string = environment.apiBaseUrl;

    constructor(
        private readonly request: RequestService,
        private readonly session: SessionService,
        private readonly http: HttpClient,
    ) {}

    getUsers(search: string, page: number, size: number): Observable<ResponseData<PagedUserResponse>> {
        const params = new HttpParams().set('Search', search).set('PageNumber', page).set('PageSize', size);
        const url = `/users`;
        return this.request.get<ResponseData<PagedUserResponse>>(url, params);
    }

    getUser(rpe: string | null): Observable<ResponseData<UserEditInterface>> {
        const route = `/users/${rpe}`;
        return this.http.get<ResponseData<UserEditInterface>>(this.url + route);
    }

    registerUser(userRequest: UserRequest): Observable<UserResponseInterface> {
        const route = `/users`;
        return this.http.post<UserResponseInterface>(this.url + route, userRequest);
    }

    updateUser(rpe: string, userRequest: UserRequest): Observable<UserResponseInterface> {
        const route = `/users/${rpe}`;
        return this.http.put<UserResponseInterface>(this.url + route, userRequest);
    }

    getExpertRoles(rpe: string): Observable<ExpertRolesInterface> {
        const route = `/users/expert-roles/${rpe}`;
        return this.http.get<ExpertRolesInterface>(this.url + route);
    }

    getCEDACRoles(rpe: string): Observable<CedacRolesInterface> {
        const route = `/users/cedac-roles/${rpe}`;
        return this.http.get<CedacRolesInterface>(this.url + route);
    }

    changeUserRoles(userRequest: UserRolesInterface): Observable<ResponseData<string>> {
        const route = `/users/change-roles`;
        return this.http.post<ResponseData<string>>(this.url + route, userRequest);
    }

    getUserPrivileges(rpe: string): Observable<ResInterface<PrivilegesUserInterface>> {
        const route = `/users/${rpe}/privileges`;
        return this.http.get<ResInterface<PrivilegesUserInterface>>(this.url + route);
    }

    getProfitCenterByRpe(rpe: string): Observable<ResponseData<UserDivision[]>> {
        const route = `/users/profit-center/${rpe}`;
        return this.http.get<ResponseData<UserDivision[]>>(this.url + route);
    }

    getProfitCentersByList(listProfits: string[]): Observable<ResponseData<ProfitCenterList[]>> {
        const route = `/users/society-profit-centers`;
        return this.http.post<ResponseData<ProfitCenterList[]>>(this.url + route, { listProfits });
    }

    getModulesByRpe(rpe: string): Observable<ResponseData<UserModuleRequest[]>> {
        const route = `/users/modules/${rpe}`;
        return this.http.get<ResponseData<UserModuleRequest[]>>(this.url + route);
    }

    getModules(listModules: string[]): Observable<ResponseData<UserModuleList[]>> {
        const route = `/users/modules`;
        return this.http.post<ResponseData<UserModuleList[]>>(this.url + route, { listModules });
    }

    getSocieties(): Observable<ResponseData<SocietyInterface[]>> {
        const route = `/users/societies`;
        return this.http.get<ResponseData<SocietyInterface[]>>(this.url + route);
    }

    filterProfitsBySociety(societies: (string | number)[]): Observable<ResponseData<ProfitCenterList[]>> {
        const route = `/users/society-profit-centers-list`;
        return this.http.post<ResponseData<ProfitCenterList[]>>(this.url + route, { societies });
    }

    getAllModules(): Observable<ResponseData<UserModuleList[]>> {
        const route = `/users/modules`;
        return this.http.get<ResponseData<UserModuleList[]>>(this.url + route);
    }

    getProfits(rpe: string): Observable<ResponseData<ProfitsCenterList[]>> {
        const route = `/users/user-profits/${rpe}`;
        return this.http.get<ResponseData<ProfitsCenterList[]>>(this.url + route);
    }

    getUmodules(rpe: string): Observable<ResponseData<UserModules[]>> {
        const route = `/users/user-modules/${rpe}`;
        return this.http.get<ResponseData<UserModules[]>>(this.url + route);
    }

    savePrivileges(rpe: string, userPrivileges: UserPrivilegesRequest): Observable<ResponseData<string>> {
        const route = `/users/save-privileges/${rpe}`;
        return this.http.post<ResponseData<string>>(this.url + route, userPrivileges);
    }
}
