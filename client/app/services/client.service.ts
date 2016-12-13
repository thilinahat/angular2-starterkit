/**
 * Created by thilina on 12/12/16.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'application/json'});
    private clientAPIurl = 'api/client';

    /*getHeroes(): Promise<Hero[]> {
     return Promise.resolve(HEROES);
     }*/

    addClient(client: any): void {
    const url = `${this.clientAPIurl}'/add'`;
        /*return this.http
            .post(url, JSON.stringify({client: client}), {headers: this.headers})
            .toPromise()
            .then(response => response.json().data as any)
            .catch(this.handleError);*/
    }

    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}