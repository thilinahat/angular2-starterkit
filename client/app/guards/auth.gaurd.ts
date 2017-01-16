/**
 * Created by thilina on 12/17/16.
 */
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot,RouterStateSnapshot,} from '@angular/router';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthGuard implements CanActivate {

    // mapping of role based route access
    private acl: any = {
        "/admin/" : ["ADMIN"],
        "/operator/" : ["OPERATOR"],
        "/customer" : ["CLIENT"],
        "/developer" : ["DEVELOPER"],
        "/change/credentials" : ["OPERATOR", "ADMIN", "CLIENT", "DEVELOPER"],
    };


    constructor(private http: Http, private router: Router) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private authorizingUrl = '/verify/user';
    private logoutUrl = '/user/logout';

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Promise<boolean> {
        let url: string = state.url; // url user trying to access
        let authorizedRoles =  this. getAutherizedRoles(url); // authorized roles for the url

        if(url == '/logout'){
            return new Promise((resolve, reject) => {
                //noinspection TypeScriptUnresolvedFunction
                this.http
                    .post(this.logoutUrl, {headers: this.headers})
                    .toPromise()
                    .then(response => {
                        resolve(false);
                        this.router.navigate(['/login']);
                    }, error => {
                        resolve(false);
                        this.router.navigate(['/login']);
                    })
                    .catch((err) => {
                        resolve(false);
                        this.router.navigate(['/login']);
                    })
            })
        } else{
            // following promise return true if the logged user has permission to access the required url, otherwise false
            return new Promise((resolve, reject) => {
                //noinspection TypeScriptUnresolvedFunction
                this.http
                    .post(this.authorizingUrl, {headers: this.headers})
                    .toPromise()
                    .then(response => {
                        //noinspection TypeScriptUnresolvedFunction
                        let userRole: string =  response.json().userRole;
                        let authorized = false;
                        authorizedRoles.forEach(authRole =>{
                            if(authRole == userRole) {
                                authorized = true;
                                resolve(true);
                            }
                        });
                        if(!authorized) {
                            resolve(false);
                            this.router.navigate(['/login']);
                        }
                    }, error => {
                        console.log(error.json());
                        resolve(false);
                        this.router.navigate(['/login']);
                    })
                    .catch((err) => {
                        //console.log(err);
                        resolve(false);
                        this.router.navigate(['/login']);
                    })
            })
        }
    }

     getAutherizedRoles(url:String): String[] {
        for(var key in this.acl) {


            if(url.match(key)){ //matching for regular expressions

                return this.acl[key];
            }

        }
        return null;
    }

}