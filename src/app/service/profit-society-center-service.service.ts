import { Injectable } from '@angular/core';
import { RequestService } from '../core/services/request.service';
import { map, Observable } from 'rxjs';
import { ProfitSocietyCenterInterface } from 'src/interface/profit-society-center-interface';
import { ResponsePSCInterface } from 'src/interface/response-interface';

@Injectable({
    providedIn: 'root',
})
export class ProfitSocietyCenterService {
    constructor(private request: RequestService) {}

    getProfitSocietyCenter(costCenter: string): Observable<ProfitSocietyCenterInterface> {
        const url = `/users/cost-center/${costCenter}`;

        return this.request.get<ResponsePSCInterface>(url).pipe(
            map((response: ResponsePSCInterface) => response.data)
        );
    }
}
