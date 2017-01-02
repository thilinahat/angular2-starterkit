/**
 * Created by tharakamd on 12/29/16.
 */

import {Injectable} from "@angular/core";
import {CallModel} from "../pages/clients/call/call.model";
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
@Injectable()
export class CallService{

    private url = '/call/';

    constructor (private http: Http) {}

    getCallSummary(): Promise<any>{
        const url_complete = this.url + "summary";
        return this.http.get(url_complete)
            .toPromise()
            .then(res => {
                return res;
            })
            .catch(error => {
                return error;
            });

    }
    storeNewCall(data: CallModel):  Promise<CallModel>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        const url_complete = this.url + "/addnew";
        return this.http.post(url_complete,JSON.stringify(data),options)
            .toPromise()
            .then(res =>{
                return data;
            })
            .catch(error =>{
                let errMsg: string;
                if (error instanceof Response) {
                    const body = error.json() || '';
                    const err = body.error || JSON.stringify(body);
                    errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
                } else {
                    errMsg = error.message ? error.message : error.toString();
                }
                console.error("error" + errMsg);
                return Observable.throw(errMsg);
            })
    }
}