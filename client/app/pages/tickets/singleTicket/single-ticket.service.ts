import {Injectable} from "@angular/core";
import {Http, Headers} from "@angular/http";

@Injectable()
export class SingleTicketService {

    private commonAPIurl = 'api/common';

    private ticketsChangeStatusUrl = this.commonAPIurl + "/ticket/change-status";
    private ticketsChangePriorityUrl = this.commonAPIurl + "/ticket/change-priority";
    private ticketsDataUrl = this.commonAPIurl +"/ticket/data/";

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
        var url = this.commonAPIurl +   "/priorities";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getTicketswimlaneTypes():Promise<any>{
        var url = this.commonAPIurl +   "/status-types";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    changeTicketStatus(ticket: any): Promise<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = this.ticketsChangeStatusUrl;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({ticket: ticket}), {headers: headers})
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

    changeTicketPriority(ticket: any): Promise<any> {
        const headers = new Headers({'Content-Type': 'application/json'});
        const url = this.ticketsChangePriorityUrl;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, JSON.stringify({ticket: ticket}), {headers: headers})
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