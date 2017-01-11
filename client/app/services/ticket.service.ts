
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class TicketService {

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'multipart/form-data'});
    private ticketAPIurl = 'api/operator';
    private numberOfActiveTicketsURL = this.ticketAPIurl +"/tickets/number-of-active-tickets";
    private overdueTicketsURL = this.ticketAPIurl + "/tickets/overdue-tickets"


    getNumberOfActiveTickets() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.numberOfActiveTicketsURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getOverDueTickets() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.overdueTicketsURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}