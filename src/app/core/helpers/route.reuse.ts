import { ActivatedRouteSnapshot, DetachedRouteHandle, RouteReuseStrategy } from '@angular/router';
import { environment } from 'src/environments/environment';

export class CustomReuseStrategy implements RouteReuseStrategy {
    private noReuseRoutes = environment.noReuseRoutes;
    private handlers: { [key: string]: DetachedRouteHandle } = {};
    shouldDetach(route: ActivatedRouteSnapshot): boolean {
        if (this.noReuseRoutes.indexOf(route.routeConfig?.path || '') !== -1) {
            return false;
        }
        return route.routeConfig && route.routeConfig.path ? true : false;
    }
    store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
        if (route.routeConfig && route.routeConfig.path) {
            this.handlers[route.routeConfig.path] = handle;
        }
    }
    shouldAttach(route: ActivatedRouteSnapshot): boolean {
        return route.routeConfig && route.routeConfig.path && !!this.handlers[route.routeConfig.path] ? true : false;
    }
    retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
        return route.routeConfig && route.routeConfig.path ? this.handlers[route.routeConfig.path] : null;
    }
    shouldReuseRoute(future: ActivatedRouteSnapshot, curr: ActivatedRouteSnapshot): boolean {
        return future.routeConfig === curr.routeConfig;
    }
}
