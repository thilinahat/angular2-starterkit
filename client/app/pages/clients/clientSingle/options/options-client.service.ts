import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import 'rxjs/add/operator/toPromise';


@Injectable()
export class OptionsClientService {

    constructor(private http: Http) { }

    private clientAPIurl = 'api/operator';
    private clientAddProducturl = 'api/operator/client/addproduct';
    private clientAddBranchurl = 'api/operator/client/addbranch';
    private clientAddTillurl = 'api/operator/client/addtill';
    private clientBlockUrl =  'api/operator/client/block';
    private clientUnBlockUrl =  'api/operator/client/unblock';
    private clientAddNoteUrl = 'api/operator/client/addnote';



    private clientDataUrl = this.clientAPIurl +"/client/data/";
    private ticketsUrl = this.clientAPIurl +"/tickets";

    getClientName(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/name";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClientProducts(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/products";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getClientNotHavingProducts(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/nothavingproducts";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getBranches(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/branches";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getTills(clientId:String):Promise<any>{
        var url = this.clientDataUrl + clientId + "/tills";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    getProblemTypes():Promise<any>{
        var url = this.ticketsUrl +   "/problemtypes";
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

    getDevelopers():Promise<any>{
        var url = this.clientAPIurl +   "/developers";
        return this.http.get(url)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    addProductToClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientAddProducturl, { data })
            .toPromise()
            .catch(this.handleError);
    }


    addBranchToClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientAddBranchurl, { data })
            .toPromise()
            .catch(this.handleError);
    }

    addTillToClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientAddTillurl, { data })
            .toPromise()
            .catch(this.handleError);
    }

    blockClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientBlockUrl, { data })
            .toPromise()
            .catch(this.handleError);
    }

    unBlockClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientUnBlockUrl, { data })
            .toPromise()
            .catch(this.handleError);
    }

    addNoteToClient (data: any): Promise<any> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.clientAddNoteUrl, { data })
            .toPromise()
            .catch(this.handleError);
    }


    addTicket(client: FormData): Promise<any> {

        const url = `${this.clientAPIurl}/add-ticket`;
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



    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); // for demo purposes only
        return Promise.reject(error.message || error);
    }

}
