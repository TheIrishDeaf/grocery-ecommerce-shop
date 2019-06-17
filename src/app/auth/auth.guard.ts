import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map(user => !!user), // maps to a boolean
            tap(loggedIn => { // tap just 'taps' into the obs and performs a side-effect function
                if (!loggedIn) {
                    console.log('access denied');
                    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
                }
            })
        );


        // return this.authService.user$.pipe(map(user => {
        //     if (user) { return true; }
        //     this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        //     return false;
        // }));
    }

    canLoad(route: Route) {
        // TODO:
        return false;
    }

}
