
import {Component, Input} from "@angular/core";
import {ClienthistoryService} from "./clienthistory.service";
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
    allHistoryData:any[] = [];
    noHistory:boolean;
    id:any;
    subscription: Subscription;
    errorMessage:String;
    @Input()
    client:any


    ngOnInit() {

        this.noHistory = false;

        this.subscription = this.route.parent.params.subscribe(params => {
            this.id = params['clientId'];
        });

        this.clienthistoryService.getClientHistory(this.id).then(clientHistory => {
            this.clientHistory = clientHistory;
            this.allHistoryData = clientHistory;

        },
            error => {
            this.errorMessage = <any>error;
                this.handleClientHistory();
        });
    }

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    handleClientHistory(){
        if(this.clientHistory.length == 0)
        {
            this.noHistory = true;
        }
    }

    loadAllHistory(){

        this.clienthistoryService.getClientHistoryAll(this.id).then(allHistoryData => {

                this.allHistoryData = allHistoryData;

            },
            error => {
                this.errorMessage = <any>error;
                this.handleClientHistory();
            });
    }
    constructor(
    private clienthistoryService :ClienthistoryService,
    private route: ActivatedRoute,
){}
}
