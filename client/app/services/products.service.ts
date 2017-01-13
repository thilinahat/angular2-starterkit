

import {Injectable} from "@angular/core";
import {Http} from "@angular/http";

@Injectable()
export class ProductService{

    private ticketAPIurl = 'api/operator';
    private numberOfExpiringTillsURL = this.ticketAPIurl +"/tickets/number-of-expiring-tills";


    getNumberOfActiveTickets() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.numberOfExpiringTillsURL)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }


    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

    constructor(
        private http: Http
    ){}
}