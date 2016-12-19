import {Component} from "@angular/core";
import { ClientService } from '../../services/client.service'

@Component({
    selector: 'clients',
    templateUrl: './clients.template.html',
    styleUrls: ['./clients.css'],
})

export class ClientsComponent {

    clientNameAndIds: any[] = [];

    searchClientName:String = '';
    searchClientID:String = '';
    errorMessage: any;

    ngOnInit(){
        this.clientService.getClientsNameIds().then(clientNameAndIds => this.clientNameAndIds = clientNameAndIds,
            error =>  this.errorMessage = <any>error );
    }




    constructor(private clientService: ClientService) {

    }




}