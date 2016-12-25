import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../shared/data/data";


@Component({

    selector:'add-call',
    templateUrl:'add-call.template.html'

})

export class AddCallComponent {

    client:any = {};

    call_time:number;
    call_description:String;
    id:string;
    errorMessage:string;
    sub:any;

    subscription:Subscription;

    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => this.client = client
        )

    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService,
        private dataHolder: ClientDataSharingService

    ){    }

}