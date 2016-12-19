
import {Component, Input} from "@angular/core";

@Component({

    selector: 'singleclientheader',
    templateUrl: 'singleclientheader.template.html',
    styles:['li:hover{background: rgba(255, 255, 255, 0.5); border-radius: 2px;}' +
    ' .card-nav-tabs{background: transparent; box-shadow: none;}}']



})

export class SingleclientheaderComponent {
    @Input()
    client:any;// = {client_name:"chamupathi"};
}
