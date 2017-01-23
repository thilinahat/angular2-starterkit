import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";
import {OptionsClientService} from "../clients/clientSingle/options/options-client.service";
import {ClientDataSharingService} from "../../shared/data/client-data-sharing.service";
import {ClientService} from "../../services/client.service";


@Component({

    selector:'add-new-ticket',
    templateUrl:'../clients/clientSingle/options/addTicket/add-ticket.template.html'

})

export class AddNewTicketComponent {

    title:string = "Add New Ticket";
    functionalaty:string = "Add ticket";

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
    editMode:boolean = true;


    screenshot:any;
    screenshotURL:string="";

    errorMessage:string;

    clientNameAndIds: any[] = [];

    subscription:Subscription;

    ngOnInit() {

        if(this.route.snapshot.parent.url.toString() == 'tickets' ){

            this.clientService.getClientsNameIds().then(clientNameAndIds => this.clientNameAndIds = clientNameAndIds,
                error =>  this.errorMessage = <any>error );

        }



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



    addAddScrenShot($event: any): void {
        this.screenshot = $event.target.files[0];
        let reader: FileReader = new FileReader();
        reader.onloadend = (e => {
            let data: any = e.target;
            this.screenshotURL = data.result;
        });

        reader.readAsDataURL(this.screenshot);

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
            this.refreshFields();
        }, error => {
            alert(error);
        });
    }

    constructor(
        private route:ActivatedRoute,
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,
        private clientService: ClientService,

    ){    }

    refreshFields(){
        this.selectedProductId = '';
        this.selectedBranchId = '';
        this.selectedTillId = '';
        this.selectedProblemTypeId = '';
        this.selectedPriority = '';
        this.problemDescription = '';
        this.selectedAssigneeId = '';
        this.summary = '';
        this.dueDate = null;
    }

    onClientChanged(){
        this.optionsClientService.getClientProducts(this.client.client_id).
        then(products => this.products = products,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getBranches(this.client.client_id).
        then(branches => this.branches = branches,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getTills(this.client.client_id).
        then(tills => this.tills = tills,
            error =>  this.errorMessage = <any>error );
    }

}