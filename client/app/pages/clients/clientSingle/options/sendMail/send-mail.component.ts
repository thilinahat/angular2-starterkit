import {Component, Input,} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';
import { OptionsClientService } from "../options-client.service";


@Component({

    selector:'send-mail',
    templateUrl:'send-mail.template.html'

})

export class SendMailComponent {

    client:any = {};



    constructor(
        private route:ActivatedRoute,
        private clientService: OptionsClientService

    ){

    }

}