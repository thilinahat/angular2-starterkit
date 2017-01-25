

import {Component, Input} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {ClientDataSharingService} from "../../../../../../shared/data/client-data-sharing.service";
import {OptionsClientService} from "../../options-client.service";
import {Subscription} from "rxjs";
@Component({
    selector:"call-history",
    templateUrl:"call-history.template.html"
})
export class CallHistoryComponent{


   @Input() client:any = {};
   @Input() history:any[];
   @Input() noHistory:boolean;



}

