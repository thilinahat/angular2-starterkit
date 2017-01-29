import {Component, Input,} from "@angular/core";
import {ActivatedRoute, Router} from '@angular/router';
import {OptionsClientService} from "../options-client.service";
import {ClientDataSharingService} from "../../../../../shared/data/client-data-sharing.service";
import {Subscription} from "rxjs";
import {FormControl} from "@angular/forms";


@Component({

    selector:'add-ticket',
    templateUrl:'add-ticket.template.html'

})

export class AddTicketeComponent {

    title:string = "Add Ticket to ";
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
//            alert(res);
            this.changeRoute(res._body);
            this.refreshFields();
        }, error => {
            alert(error);
        });
    }
    ngOnDestroy() {
        // prevent memory leak when component is destroyed
        this.subscription.unsubscribe();
    }

    changeRoute(ticketId:any){
        this.router.navigate(['../../../tickets/' + ticketId], { relativeTo: this.route });
    }


    constructor(
        private router:Router,
        private route:ActivatedRoute,
        private optionsClientService: OptionsClientService,
        private dataHolder: ClientDataSharingService,

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

}