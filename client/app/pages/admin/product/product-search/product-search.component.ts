
import {Component} from "@angular/core";
import {ClientService} from "../../../../services/client.service";
import {ProductManagementService} from "../../../../services/product.service";

@Component({
    selector: 'product-search',
    templateUrl: 'product-search.template.html',
    styleUrls: ['../product.css'],
})



export class ProductSearchComponent{

    errorMessage:string;

    clientNameAndIds: any[] = [];
    products: any[] = [];
    purchasedList:any[] = [];
    noPurchases:boolean;


    ngOnInit(){

        this.clientService.getClientsNameIds().then(clientNameAndIds => {
                clientNameAndIds.unshift({client_id: "Any", company_name: "Any"});

                this.clientNameAndIds = clientNameAndIds },
            error =>  this.errorMessage = <any>error );

        this.productManagementService.getAllProducts().then(results => {
            results.unshift({product_Id: "Any", name: "All"});
            this.products = results;
        }, error => {
            alert(error);
        });

        const tillFilterData = {
            clientID:'Any',
            productID:'Any'
        };

        this.productManagementService.getFilterdTills(tillFilterData).then(results => {

            this.purchasedList = results;

            this.noPurchases = results.length == 0;

        }, error => {
            this.errorMessage = <any>error
        });



    }

    onStateChange($event:any){
        this.productManagementService.getFilterdTills($event).then(results => {
            this.purchasedList = results;
            this.noPurchases = results.length == 0;

        }, error => {
            this.errorMessage = <any>error
        });

    }
    constructor(
        private clientService: ClientService,
        private productManagementService: ProductManagementService,

    ) {}

}

