import {Component, Input,} from "@angular/core";

@Component({

    selector:'add-call',
    templateUrl:'add-call.template.html'

})

export class AddCallComponent {
    @Input()
    client:any;


}