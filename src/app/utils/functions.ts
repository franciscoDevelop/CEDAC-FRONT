import { map, Observable } from 'rxjs';
import { FunctionService } from '../service/function.service';
import { HasRequestInterface } from 'src/interface/has-request-interface';

export const expertWithRequest = (
    rpe: string,
    level: string,
    functionService: FunctionService,
): Observable<boolean> => {
    return functionService.getRequest(rpe, level).pipe(
        map((response: HasRequestInterface) => {
            return response.data
        }),
    );
};
