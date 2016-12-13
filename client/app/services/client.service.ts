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

    getClientsNameIds() : any[]{


        return [
            {name: "client 1", id:"C0001"},
            {name: "james", id:"C0002"},
            {name: "anna", id:"C0003"},
            {name: "xtream solutions", id:"C1001"},
            {name: "exchange plus", id:"C0201"},
            {name: "european double", id:"C031"},
            {name: "american exprex", id:"C4001"},
        ];
    }
}