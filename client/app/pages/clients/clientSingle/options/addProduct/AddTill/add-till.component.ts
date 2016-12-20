import {Component, Input,} from "@angular/core";

@Component({

    selector:'add-till',
    templateUrl:'add-till.template.html'

})

export class AddTillComponent {

    @Input()
    product:string;
    @Input()
    branch:string;

}