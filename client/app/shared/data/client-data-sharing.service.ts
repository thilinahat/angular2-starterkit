import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable()
export class ClientDataSharingService {

    // Observable navItem source
    private _navItemSource = new BehaviorSubject<any>(0);
    // Observable navItem stream
    clientData$ = this._navItemSource.asObservable();
    // service command
    changeClient(client:any) {
        this._navItemSource.next(client);
    }


}