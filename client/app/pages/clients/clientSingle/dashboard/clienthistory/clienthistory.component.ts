
import {Component, Input} from "@angular/core";
import {ClienthistoryService} from "./clienthistory.servece";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";
import {ActivatedRoute} from "@angular/router";

@Component({

    selector: 'clienthistory',
    templateUrl: 'clienthistory.template.html',
    styles:['.subject{ color: black} .date-pull-right{float: right !important;}']



})

export class ClienthistoryComponent {
    clientHistory:any[]  = [];
    id:any;
    subscription: Subscription;
    errorMessage:String;
    @Input()
    client:any


    ngOnInit() {
        this.subscription = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
        });

        this.clienthistoryService.getClientHistory(this.id).then(clientHistory => this.clientHistory = clientHistory,
            error => this.errorMessage = <any>error);
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
    private clienthistoryService :ClienthistoryService,
    private route: ActivatedRoute,
){}
}
