/**
 * Created by thilina on 12/12/16.
 */
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ClientService {

    constructor(private http: Http) { }

    private headers = new Headers({'Content-Type': 'multipart/form-data'});
    private clientAPIurl = 'api/operator';
    private clientDataUrl = this.clientAPIurl +"/client/data/";
    private clientSearchDataUrl = this.clientAPIurl +"/client/searchdata";

    addClient(client: FormData): Promise<any> {

        const url = `${this.clientAPIurl}/client/add`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, client)
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

    editClient(client: FormData, id: String): Promise<any> {

        const url = `${this.clientAPIurl}/client/edit/${id}`;
        return new Promise((resolve, reject) => {
            //noinspection TypeScriptUnresolvedFunction
            this.http
                .post(url, client)
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

    getClientsNameIds() : Promise<any[]>{

        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(this.clientSearchDataUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);

    }

    getClientData(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId ;
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }



    getClientMails(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + '/mail';
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClientPhones(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + '/phone';
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClientFaxes(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + '/fax';
        //noinspection TypeScriptUnresolvedFunction
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    private handleError(error: any): Promise<any> {
        //console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }
}