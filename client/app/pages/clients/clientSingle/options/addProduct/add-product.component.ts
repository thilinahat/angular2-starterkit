import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {OptionsClientService} from "../options-client.service";


@Component({

    selector:'add-product',
    templateUrl:'add-product.template.html',
    styleUrls:['add-product.css']

})

export class AddProductComponent {

    client:any = {};

    selectedProduct:String = "Choose Product";
    selectedBranch:String = '';
    selectedOtherProduct:String = ''
    newBrachName:String = '';

    branches: string[] = ['london','city 2'];

    id:string;
    errorMessage:string = 'default error    ';
    inputError:boolean = false;
    sub:any;

    products:String[] = ['MX', 'MX Plus'];
    otherproducts:String[] = [ 'Other Prod 1', 'Other Prod 2'];

    showAddNewProduct:boolean = false;
    showAddNewbranch:boolean = false;

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {

            this.id = params['clientId']; // (

        });

        this.client = this.clientService.getClientName(this.id).
        then(clientdata => this.client = clientdata,
            error =>  this.errorMessage = <any>error );
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService

    ){    }

    showAddnewProduct = function () {
        this.showAddNewProduct = !this.showAddNewProduct;
    }

    showAddnewbranch = function () {
        this.showAddNewbranch = !this.showAddNewbranch;
    }

    addProductToClient = function () {
        if(this.selectedOtherProduct.length == 0 ){
            this.errorMessage = "Select a Product";
            return;
        }
        else {
            //send req to server
            this.products.push(this.selectedOtherProduct);
            this.showAddNewProduct = !this.showAddNewProduct;
            return;
        }
    }

    addBranchToClient = function () {
        if(this.newBrachName.length == 0 ){
            this.errorMessage = "Enter a Branch";
            return;
        }
        else {
            //send req to server
            //validate
            this.branches.push(this.newBrachName);
            this.showAddNewbranch = !this.showAddNewbranch;
            return;
        }
    }
}