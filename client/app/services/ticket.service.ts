/**
 * Created by thilina on 1/7/17.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TicketService {

    constructor(private http: Http) { }

    private developerAPIurl = 'api/developer';
    private commonAPIurl = 'api/common'

    getTicketsRelatedToDeveloper(state: any): Promise<any> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.developerAPIurl}/tickets`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({state: state}), {headers: headers})
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