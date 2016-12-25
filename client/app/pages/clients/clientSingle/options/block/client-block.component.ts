import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/data";
import {Subscription} from "rxjs";


@Component({

    selector:'client-block',
    templateUrl:'client-block.template.html'

})

export class ClientBlockComponent {

    subscription:Subscription;
    client:any;

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

    ){

    }



}