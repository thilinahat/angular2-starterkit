
import {Component, Input} from "@angular/core";

@Component({

    selector: 'clientproduct',
    templateUrl: 'clientproduct.template.html',



})

export class ClientproductComponent {
    @Input()
    client:any;// = {client_name:"chamupathi"};
}
