import { Injectable, Injector } from '@angular/core';
import { SessionService } from './session.service';

@Injectable({
    providedIn: 'root',
})
export class CoreService {
    private static injector: Injector;

    constructor(injector: Injector) {
        CoreService.injector = injector;
    }

    static session(): SessionService {
        return CoreService.injector.get(SessionService);
    }
}
