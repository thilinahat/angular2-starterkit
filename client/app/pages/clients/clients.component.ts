import {Component} from "@angular/core";
import { ClientService } from '../../services/client.service'

@Component({
    moduleId:module.id,
    selector: 'clients',
    templateUrl: './clients.template.html',
    styleUrls: ['./clients.css'],

})

export class ClientsComponent {

    ngOnInit(){
        this.clientNameAndIds = this.clientService.getClientsNameIds();
    }

    clientNameAndIds: any[];




    searchClientName:String = '';
    searchClientID:String = '';


    constructor(private clientService: ClientService) {

    }




}