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
        "/operator/dashboard" : ["OPERATOR", "ADMIN"],
        "/operator/clients/search" : ["OPERATOR", "ADMIN"],
        "/operator/clients/addclient" : ["OPERATOR", "ADMIN"],
        "/operator/clients/mail" : ["OPERATOR", "ADMIN"],
        "operator/clients/[0-9]*/addcall":["OPERATOR", "ADMIN"],
        "operator/clients/[0-9]*/addnote":["OPERATOR", "ADMIN"],
        "operator/clients/[0-9]*/addticket":["OPERATOR", "ADMIN"],
        "operator/clients/[0-9]*/addproduct":["OPERATOR", "ADMIN"],
        "operator/clients/[0-9]*/edit":["OPERATOR", "ADMIN"],
        "/operator/clients/[0-9]*" : ["OPERATOR", "ADMIN"], // regular expression for client id
        "/operator/tickets" : ["OPERATOR", "ADMIN"],
        "/operator/reports" : ["OPERATOR", "ADMIN"],
        "/customer" : ["CLIENT"],
        "/change/credentials" : ["OPERATOR", "ADMIN", "CLIENT"],
    };


    constructor(private http: Http, private router: Router) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private authorizingUrl = '/verify/user';

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) :  Promise<boolean> {
        let url: string = state.url; // url user trying to access

        let authorizedRoles =  this. getAutherizedRoles(url); // authorized roles for the url

        // following promise return true if the logged user has permission to access the required url, otherwise false
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(this.authorizingUrl, {headers: this.headers})
                .toPromise()
                .then(response => {
                    //noinspection TypeScriptUnresolvedFunction
                    let userRole: string =  response.json().userRole;
                    authorizedRoles.forEach(authRole =>{
                        if(authRole == userRole)
                            resolve(true);
                    });
                }, error => {
                    console.log(error.json());
                    this.router.navigate(['/login']);
                })
                .catch((err) => {
                    //console.log(err);
                    reject(false);
                })
        })
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