
import {Component, Input} from "@angular/core";

@Component({

    selector: 'clienthistory',
    templateUrl: 'clienthistory.template.html',



})

export class ClienthistoryComponent {
    @Input()
    client:any;
}
