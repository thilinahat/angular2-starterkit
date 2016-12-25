/**
 * Created by thilina on 12/16/16.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private loginUrl = '/authenticate';
    private logoutUrl = '/logout';
    private changeCredentialsUrl = '/change-credentials';

    login(user: any):  Promise<any> {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(this.loginUrl, JSON.stringify({user: user}), {headers: this.headers})
                .toPromise()
                .then(response => {
                    //noinspection TypeScriptUnresolvedFunction
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        })
    }

    changeCredentials(credentials: any):  Promise<any> {
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(this.changeCredentialsUrl, JSON.stringify({credentials: credentials}), {headers: this.headers})
                .toPromise()
                .then(response => {
                    //noinspection TypeScriptUnresolvedFunction
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        })
    }
}