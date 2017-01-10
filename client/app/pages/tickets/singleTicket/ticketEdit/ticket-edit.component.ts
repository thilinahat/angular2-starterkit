import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import {Subscription} from "rxjs";
import {OptionsClientService} from "../../../clients/clientSingle/options/options-client.service";
import {ClientDataSharingService} from "../../../../shared/data/client-data-sharing.service";
import {SingleTicketService} from "../single-ticket.service";
import {FormControl, FormBuilder} from "@angular/forms";


@Component({

    selector:'add-ticket',
    templateUrl:'../../../clients/clientSingle/options/addTicket/add-ticket.template.html'

})

export class EditTicketsComponent {

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
    editMode:boolean = false;

    screenshot:any;

    errorMessage:string;

    subscription:Subscription;
    sub:Subscription;

    selectedTicket:any = {};
    screanshotavilable:any;

    ticketsFormGroup:any;

    id:string;

    ngOnInit() {


        this.optionsClientService.getProblemTypes().
        then(problemTypes => this.problemTypes = problemTypes,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getPriorities().
        then(priorities => this.priorities = priorities,
            error =>  this.errorMessage = <any>error );

        this.optionsClientService.getDevelopers().
        then(asignees => this.asignees = asignees,
            error =>  this.errorMessage = <any>error );

        this.sub = this.route.params.subscribe(params => {
            this.id = params['ticketId'];

            this.loadTicketData();


        });

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
            this.refreshFields();
        }, error => {
            alert(error);
        });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        //this.subscription.unsubscribe();
    }

    constructor(
        private route:ActivatedRoute,
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,
        private singleTicketService:SingleTicketService,


    ){ }

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

    loadTicketData(){
        this.singleTicketService.getClientTicktsAllData(this.id).
        then(selectedTicket => {
                this.selectedTicket = selectedTicket;
                this.summary = this.selectedTicket.summary;
                this.problemDescription = this.selectedTicket.description;

                //alert(this.selectedTicket.client_id);

                if(this.selectedTicket.sceenshot_name && this.selectedTicket.sceenshot_name.length > 0){
                    this.screanshotavilable = true;
                }
                else{ this.screanshotavilable = false; }
            },
            error =>  this.errorMessage = <any>error );
    }


}