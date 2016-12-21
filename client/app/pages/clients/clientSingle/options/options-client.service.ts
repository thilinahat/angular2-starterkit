import { Injectable } from '@angular/core';
import {Http} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class OptionsClientService {

    constructor(private http: Http) { }

    private clientAPIurl = 'api/operator';

    private clientDataUrl = this.clientAPIurl +"/client/data/";

    getClientName(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/name";
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