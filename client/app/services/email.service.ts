/**
 * Created by tharakamd on 12/13/16.
 */
import { Injectable }     from '@angular/core';
import { Http, Response, Headers, RequestOptions} from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import {IncomingMail} from '../pages/clients/mail/mail.component';
import {MailModel} from '../pages/clients/mail/mailModel'
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class EmailService{
    private imap_apiUrl = '/mail/i';
    private smtp_apiUrl = '/mailsend';

    constructor (private http: Http) {}

    /**
     * IMAP function
     * @returns {Observable<R>}
     */
    getMails(from:String): Observable<IncomingMail[]> {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.imap_apiUrl,{
            from: from
        },options)
            .map(this.extractData)
            .catch(this.handleError);
    }

    /**
     * SMTP function
     * @param title
     * @param body
     */
    sendMail(mailModal : MailModel): Observable<MailModel>{
        let headers = new Headers({ 'Content-Type': 'application/json' });
        let options = new RequestOptions({ headers: headers });
        return this.http.post(this.smtp_apiUrl,{
            title: mailModal.title,
            body: mailModal.body,
            sending_to: mailModal.to
        },options)
            .map(this.extractData)
            .catch(this.handleError)
    }

    private extractData(res: Response) {
        let body = res.json();
        return body|| { };
    }

    private handleError (error: Response | any) {
        // In a real world app, we might use a remote logging infrastructure
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
    }
}