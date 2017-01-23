
import {Component, Output, EventEmitter, Input} from "@angular/core";

@Component({
    selector: 'till-filter',
    templateUrl: 'tillFilter.template.html',
    styleUrls: ['../../product.css'],
})

export class TillFilterComponent {

    constructor() {}

    productID: string = 'Any';
    clientID: string = 'Any';
    client:any = {};

    @Input() products: any[];
    @Input() clientNameAndIds: any[];

    @Output() onStateChange: EventEmitter<any> = new EventEmitter();

    ngOnInit(){
        this.client.company_name = 'Any';
    }
    onProductChange(productId: any): void{
        this.productID = productId;
        this.onStateChange.next({
            productID: this.productID,
            clientID: this.clientID,
        });
    }


    onClientChange(ClientID: any): void{
        this.clientID = ClientID;
        this.onStateChange.next({
            productID: this.productID,
            clientID: this.clientID,
        });
    }
}