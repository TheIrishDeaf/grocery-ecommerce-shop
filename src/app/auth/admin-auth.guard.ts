import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanLoad, Route, Router } from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { tap, map, take, switchMap } from 'rxjs/operators';
import { UserService } from '../shared/services/user.service';

@Injectable()
export class AdminAuthGuard implements CanActivate, CanLoad {

    constructor(
        private authService: AuthService,
        private router: Router,
        private userService: UserService) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        return this.authService.user$.pipe(
            take(1),
            map(user => user.isAdmin),
            tap(isAdmin => { // tap just 'taps' into the obs and performs a side-effect function
                if (isAdmin === false) {
                    console.log('access denied');
                    this.router.navigate(['/']);
                }
            })
        );
    }

    canLoad(route: Route) {
        // TODO:
        return false;
    }

}
