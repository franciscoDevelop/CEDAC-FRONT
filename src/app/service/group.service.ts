import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GroupInterface } from 'src/interface/group-interface';
import { ResponseData } from 'src/interface/response-data';

@Injectable({
    providedIn: 'root',
})
export class GroupService {
    url: string = environment.apiBaseUrl;

    constructor(private readonly http: HttpClient) {}

    getGroups(): Observable<ResponseData<GroupInterface[]>> {
        const route = `/groups`;
        return this.http.get<ResponseData<GroupInterface[]>>(this.url + route);
    }

    getGroupByName(id: string): Observable<ResponseData<GroupInterface>> {
        const route = `/groups/${id}`;
        return this.http.get<ResponseData<GroupInterface>>(this.url + route);
    }
}
