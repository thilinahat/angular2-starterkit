import {Component, Input,} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from "rxjs";
import {OptionsClientService} from "../../../clients/clientSingle/options/options-client.service";
import {SingleTicketService} from "../single-ticket.service";


@Component({

    selector:'add-ticket',
    templateUrl:'../../../clients/clientSingle/options/addTicket/add-ticket.template.html'

})

export class EditTicketsComponent {

    title:string = "Edit Ticket of ";
    functionalaty:string = "Update ticket";


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
    screenshotURL:string = "";


    id:string;
    date:Date;

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
        formData.append("clientId", this.client.clientId);
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
        formData.append("ticketId", this.id);

        this.optionsClientService.updateTicket(formData).then(res => {
            alert('Successfully updated Ticket');
            this.changeRoute();
        }, error => {
            alert(error);
        });
    }

    constructor(
        private route:ActivatedRoute,
        private optionsClientService: OptionsClientService,
        private singleTicketService:SingleTicketService,
        private router:Router


    ){ }

    changeRoute(){
        this.router.navigate(['../'], { relativeTo: this.route });
    }

    loadTicketData(){
        this.singleTicketService.getClientTicktsAllData(this.id).
        then(selectedTicket => {
                this.selectedTicket = selectedTicket;
                this.summary = this.selectedTicket.summary;
                this.problemDescription = this.selectedTicket.description;

                //alert(this.selectedTicket.client_id);
                this.optionsClientService.getClientProducts(this.selectedTicket.client_id).
                then(products => this.products = products,
                    error =>  this.errorMessage = <any>error );

                this.optionsClientService.getBranches(this.selectedTicket.client_id).
                then(branches => this.branches = branches,
                    error =>  this.errorMessage = <any>error );

                this.optionsClientService.getTills(this.selectedTicket.client_id).
                then(tills => this.tills = tills,
                    error =>  this.errorMessage = <any>error );


                this.assignData();


                if(this.selectedTicket.sceenshot_name && this.selectedTicket.sceenshot_name.length > 0){
                    this.screanshotavilable = true;
                    this.screenshotURL = this.selectedTicket.sceenshot_name;
                }

                else{ this.screanshotavilable = false; }
            },
            error =>  this.errorMessage = <any>error );
    }

    assignData(){
        this.client.clientId = this.selectedTicket.client_id;
        this.selectedProductId = this.selectedTicket.product_Id;
        this.selectedBranchId = this.selectedTicket.branch_id;
        this.selectedTillId = this.selectedTicket.till_id;
        this.selectedProblemTypeId = this.selectedTicket.problem_type_id;
        this.selectedPriority = this.selectedTicket.priority_id;
        this.selectedAssigneeId = this.selectedTicket.assignee_id;
        this.dueDate = this.selectedTicket.due_date.toString().substring(0,10);
        this.client.company_name = this.selectedTicket.company_name;

        this.date = new Date(this.selectedTicket.due_date);

        if(this.selectedTicket.sceenshot_name){
            this.screenshot = this.selectedTicket.sceenshot_name;
            this.screenshotURL = this.selectedTicket.sceenshot_name;
        }


    }


}