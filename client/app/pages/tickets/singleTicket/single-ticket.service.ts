

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class SingleTicketService {

    private clientAPIurl = 'api/operator';

    private ticketsUrl = this.clientAPIurl +"/tickets";
    private ticketsChangeStatusUrl = this.clientAPIurl + "/ticket/change-status";
    private ticketsChangePriorityUrl = this.clientAPIurl + "/ticket/change-priority";



    private ticketsDataUrl = this.clientAPIurl +"/ticket/data/";

    constructor(private http: Http) {
    }


    getClientTicktsAllData(ticketId: String): Promise<any> {
        var url = this.ticketsDataUrl + ticketId;
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getPriorities():Promise<any>{
        var url = this.ticketsUrl +   "/priorities";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getTicketswimlaneTypes():Promise<any>{
        var url = this.ticketsUrl +   "/status-types";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    changeTicketStatus(ticket: FormData): Promise<any> {

        const url = this.ticketsChangeStatusUrl;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, ticket)
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

    changeTicketPriority(ticket: FormData): Promise<any> {

        const url = this.ticketsChangePriorityUrl;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, ticket)
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


    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}