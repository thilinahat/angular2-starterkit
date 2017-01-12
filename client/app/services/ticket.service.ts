
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
    private overdueTicketsDashboardURL = this.ticketAPIurl + "/tickets/overdue-tickets-for-dashboard"
    private highPriorityTicketsDashboardURL = this.ticketAPIurl + "/tickets/high-priority-tickets-for-dashboard"
    private mediumPriorityTicketsDashboardURL = this.ticketAPIurl + "/tickets/medium-priority-tickets-for-dashboard"
    private lowPriorityTicketsDashboardURL = this.ticketAPIurl + "/tickets/low-priority-tickets-for-dashboard"


     private developerAPIurl = 'api/developer';


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

    getOverDueTicketsForDashBoard() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.overdueTicketsDashboardURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getHighPriorityTicketsForDashBoard() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.highPriorityTicketsDashboardURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getMediumPriorityTicketsForDashBoard() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.mediumPriorityTicketsDashboardURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getLowPriorityTicketsForDashBoard() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.lowPriorityTicketsDashboardURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getTicketsRelatedToDeveloperWithCount(state: any): Promise<any> {

        const headers = new Headers({'Content-Type': 'application/json'});
        const url = `${this.developerAPIurl}/tickets/with-count`;
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

    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}