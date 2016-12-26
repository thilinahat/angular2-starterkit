/**
 * Created by thilina on 12/26/16.
 */
import {Component} from "@angular/core";
import { ClientService } from '../../../services/client.service'

@Component({
    selector: 'searchclient',
    templateUrl: 'searchclient.template.html',
    styleUrls: [],
})

export class SearchClientComponent {

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