import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class ClienthistoryService {

    constructor(private http: Http) { }

    private clientdataURL = 'api/operator/client/data/';

    getClientHistory(clientId:String):Promise<any>{
        var url = this.clientdataURL + clientId + "/history";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
