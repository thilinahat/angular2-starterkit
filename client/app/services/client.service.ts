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
    private clientAPIurl = 'api/operator';

    addClient(client: any): Promise<any> {

        const url = `${this.clientAPIurl}/add-client`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({client: client}), {headers: this.headers})
                .toPromise()
                .then(response => {
                    resolve(response);
                },error => {
                    reject(error);
                })
                .catch((err) => {
                    console.log(err);
                    reject(err);
                });
        });
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