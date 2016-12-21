import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {OptionsClientService} from "../options-client.service";
import {forEach} from "@angular/router/src/utils/collection";


@Component({

    selector:'add-product',
    templateUrl:'add-product.template.html',
    styleUrls:['add-product.css']

})

export class AddProductComponent {

    client:any = {};

    selectedProductName:String;
    selectedProductId:any;

    selectedProductindex:number;

    selectedBranchName:String = '';
    selectedBranchId:any;

    selectedOtherProduct:any
    newBranchName:String = '';
    newBranchLocation:String = '';

    branches: any[] = [];

    id:string;
    errorMessage:string = 'default error    ';
    inputError:boolean = false;
    sub:any;

    products:any[] = [];
    otherproducts:any[] = [];

    showAddNewProduct:boolean = false;
    showAddNewbranch:boolean = false;
    testarray:any[] = [];

    ngOnInit(){
        this.sub = this.route.params.subscribe(params => {

            this.id = params['clientId'];

        });

         this.clientService.getClientName(this.id).
        then(clientdata => this.client = clientdata,
            error =>  this.errorMessage = <any>error );


        this.clientService.getClientProducts(this.id).
        then(products => this.products = products,
            error =>  this.errorMessage = <any>error );


        this.clientService.getClientNotHavingProducts(this.id).
        then(otherproducts => this.otherproducts = otherproducts,
            error =>  this.errorMessage = <any>error );

        this.getBranches();
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



    addBranchToClient  ()   {

            if (!this.newBranchName || !this.newBranchLocation) { return; }

        var data = {
            branchName:this.newBranchName,
            branchLocation:this.newBranchLocation,
            clientId:this.id
        };

        this.clientService.addBranchToClient(data)
            .then(
                res  => this.handleBranchAdding(),
                error =>  this.errorMessage = <any>error);


    }

    getClientData = function () {

    }

    addProductToClient ( ) {

        if (!this.selectedOtherProduct) { return; }

      var data = {
          product:this.otherproducts[this.selectedOtherProduct],
          clientId:this.id
      };

        this.clientService.addProductToClient(data)
            .then(
                res  => this.handleProductAdding(),
                error =>  this.errorMessage = <any>error);
    }

    handleProductAdding(){

            alert('Successfully Added Product');
            this.products.push(this.otherproducts[this.selectedOtherProduct]);
            this.otherproducts.splice(this.selectedOtherProduct,1);
            this.showAddNewProduct = !this.showAddNewProduct;

    }

    handleBranchAdding(){
        alert('Successfully Added Branch');
        this.showAddNewbranch = !this.showAddNewbranch;
        this.getBranches();
    }

    getBranches(){
        this.clientService.getBranches(this.id).
        then(branches => this.branches = branches,
            error =>  this.errorMessage = <any>error );
    }

    onProductChanged(){

        for (var product of this.products) {
            if(this.selectedProductId == product.product_Id){

                this.selectedProductName = product.name;
            }

        }

    }


    onBranchChanged(){

        for (var branch of this.branches) {
            if(this.selectedBranchId == branch.branch_id){

                this.selectedBranchName = branch.name;
                console.log(branch.name)
            }

        }

    }
}