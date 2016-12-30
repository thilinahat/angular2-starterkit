import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {OptionsClientService} from "../options-client.service";
import {forEach} from "@angular/router/src/utils/collection";
import {Subscription} from "rxjs";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";


@Component({

    selector:'add-product',
    templateUrl:'add-product.template.html',
    styleUrls:['add-product.css']

})

export class AddProductComponent {

    client:any = {};

    selectedProductName:String;
    selectedProductId:any;


    selectedBranchName:String = '';
    selectedBranchId:any;

    selectedOtherProduct:any
    newBranchName:String = '';
    newBranchLocation:String = '';

    branches: any[] = [];

    id:string;
    errorMessage:string = 'default error    ';
    inputError:boolean = false;
    sub:Subscription;

    products:any[] = [];
    otherproducts:any[] = [];
    noProducts:boolean;

    showAddNewProduct:boolean = false;
    showAddNewbranch:boolean = false;

    subscription:Subscription;

    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
        this.sub.unsubscribe();
    }


    ngOnInit(){

        this.noProducts = false;

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => this.client = client
        )

        this.sub = this.route.parent.params.subscribe(params => {

            this.id = params['clientId'];

        });


        this.clientService.getClientProducts(this.id).
        then(products => this.products = products,
            error =>  {
            this.errorMessage = <any>error;
            this.noProducts = true;
        } );


        this.clientService.getClientNotHavingProducts(this.id).
        then(otherproducts => this.otherproducts = otherproducts,
            error =>  this.errorMessage = <any>error );

        this.getBranches();
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService,
        private dataHolder: ClientDataSharingService

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

    getInitialData(client:any){

    }
}