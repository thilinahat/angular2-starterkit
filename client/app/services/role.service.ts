/**
 * Created by thilina on 1/1/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class RoleManagementService {

    constructor(private http: Http) { }

    private adminAPIurl = 'api/admin';

    addUser(user: FormData): Promise<any> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.adminAPIurl}/user/add`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({user: user}), {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getUnblockedUsers(role: string): Promise<any> {

        const url = `${this.adminAPIurl}/users/unblocked/${role}`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .get(url)
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getAllDevelopers(): Promise<any> {

        const url = `${this.adminAPIurl}/users/developers`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .get(url)
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getAllOperators(): Promise<any> {

        const url = `${this.adminAPIurl}/users/operators`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .get(url)
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    blockUser(user: FormData): Promise<any> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.adminAPIurl}/user/block`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({user: user}), {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    getBlockedUsers(role: string): Promise<any> {

        const url = `${this.adminAPIurl}/users/blocked/${role}`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .get(url)
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }

    unblockUser(user: FormData): Promise<any> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.adminAPIurl}/user/unblock`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({user: user}), {headers: headers})
                .toPromise()
                .then(response => {
                    resolve(response.json());
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
    }
}