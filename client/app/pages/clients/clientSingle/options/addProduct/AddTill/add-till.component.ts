import {Component, Input,} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
import {OptionsClientService} from "../../options-client.service";

@Component({

    selector:'add-till',
    templateUrl:'add-till.template.html'

})

export class AddTillComponent {

    sub:any;
    id:String;
    expireDate:any;
    productKey:String;

    errorMessage:string = 'default error';

    @Input()
    product:any;
    @Input()
    branch:any;
    @Input()
    productId:String;
    @Input()
    branchId:String;

    ngOnInit() {
        this.sub = this.route.params.subscribe(params => {

            this.id = params['clientId'];

        });
    }

    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService

    ){    }

    addTillToClient ()
    {
        if(! this.tillDataValid()) { return }

        var data = {
            branchId:this.branchId,
            productId:this.productId,
            clientId:this.id,
            tillKey:this.productKey,
            expireDate:this.expireDate
        };

        this.clientService.addTillToClient(data)
            .then(
                res  => this.handleTillAdding(),
                error =>  this.errorMessage = <any>error);

    }

    tillDataValid (): boolean {
            //stab
            return (this.branchId && this.productId && this.productKey && this.expireDate);
    }

    handleTillAdding(){
        alert('till was successfully added');
         this.productKey = '';
        this.expireDate = '';
    }
}