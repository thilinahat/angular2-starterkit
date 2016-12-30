import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {OptionsClientService} from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";


@Component({

    selector:'add-ticket',
    templateUrl:'add-ticket.template.html'

})

export class AddTicketeComponent {

    client:any = {};
    products:any[] = [];
    branches:any[] = [];
    problemTypes:any[] = [];
    priorities:any[] = [];
    asignees: any[] = [];
    tills:any[] = [];

    selectedProductId:string = '';
    selectedBranchId:string = '';
    selectedTillId:string = '';
    selectedProblemTypeId:string = '';
    selectedPriority:string = '';
    problemDescription:string = '';
    selectedAssigneeId:string = '';
    summary:string = '';
    dueDate:string = '';

    screenshot:any;

    errorMessage:string;

    subscription:Subscription;

    ngOnInit() {

        this.subscription = this.dataHolder.clientData$.subscribe(
            client => {
                this.client = client;

                this.optionsClientService.getClientProducts(client.client_id).
                then(products => this.products = products,
                    error =>  this.errorMessage = <any>error );

                this.optionsClientService.getBranches(client.client_id).
                then(branches => this.branches = branches,
                    error =>  this.errorMessage = <any>error );

                this.optionsClientService.getTills(client.client_id).
                then(tills => this.tills = tills,
                    error =>  this.errorMessage = <any>error );

            }
        )

        this.optionsClientService.getProblemTypes().
        then(problemTypes => this.problemTypes = problemTypes,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getDevelopers().
        then(asignees => this.asignees = asignees,
            error =>  this.errorMessage = <any>error );

    }

    onProductChanged(){

    }

    onBranchChanged(){

    }

    onTillChanged(){

    }

    onPriorityChanged(){

    }

    addAddScrenShot($event: any): void {
        this.screenshot = $event.target.files[0];
    }

    onSubmit(form: any): void {
        let formData = new FormData();
        formData.append("clientId", this.client.client_id);
        formData.append("summary", this.summary);
        formData.append("selectedProductId", this.selectedProductId);
        formData.append("selectedBranchId", this.selectedBranchId);
        formData.append("selectedTillId", this.selectedTillId);
        formData.append("selectedProblemTypeId", this.selectedProblemTypeId);
        formData.append("selectedPriority", this.selectedPriority);
        formData.append("problemDescription", this.problemDescription);
        formData.append("screenshot", this.screenshot);
        formData.append("selectedAssigneeId", this.selectedAssigneeId);
        formData.append("dueDate", this.dueDate);

        this.optionsClientService.addTicket(formData).then(res => {
            alert('Successfully Added Ticket');
        }, error => {
            alert(error);
        });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    constructor(
        private route:ActivatedRoute,
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,

    ){    }

}