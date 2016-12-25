
import {Component, Input} from "@angular/core";
import {SingleClientHeaderItem} from "./single-client-header-item.component";
import {ActivatedRoute} from "@angular/router";

@Component({

    selector: 'singleclientheader',
    templateUrl: 'singleclientheader.template.html',
    styles:['li:hover{background: rgba(255, 255, 255, 0.5); border-radius: 2px;}' +
    ' .card-nav-tabs{background: transparent; box-shadow: none;} .active-header{background: rgba(255, 255, 255, 0.5) !important;}']



})

export class SingleclientheaderComponent {
    private sub: any;
    @Input()
    client:any= {};// = {client_name:"chamupathi"};
    currentactivepath:string;

    ngOnInit(){

        this.sub = this.route.params.subscribe(params => {
            this.client.client_id = params['clientId'];
        });

        this.route.snapshot.data['client'] = "client Name";


        this.currentactivepath = "/" + this.route.snapshot.url.join('/');

       // console.log(this.route.snapshot.url.join('/'));
        this.headerItems = [
            {name:"details 1",path:"/operator/clients/" + this.client.client_id , active:false},
            {name:"edit",path:"/operator/clients/" + this.client.client_id +"/edit", active:false},
            {name:"add call",path:"/operator/clients/" + this.client.client_id +"/addcall", active:false},
            {name:"add note",path:"/operator/clients/" + this.client.client_id + "/addnote", active:true},
            {name:"add product",path:"/operator/clients/" + this.client.client_id +"/addproduct", active:false},
            {name:"add ticket",path:"/operator/clients/" + this.client.client_id +"/addticket", active:false},
            {name:"Send Mail",path:"/operator/clients/" + this.client.client_id +"/sendmail", active:false},
            {name:"block",path:"/operator/clients/" + this.client.client_id +"/block", active:false},
        ];
    }
    headerItems:SingleClientHeaderItem[] = [
        ];


    constructor( private route: ActivatedRoute, ) {

    }
}
