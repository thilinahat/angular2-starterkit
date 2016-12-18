import {Component} from "@angular/core";
import {ClientService} from "../../services/client.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
import 'rxjs/add/operator/switchMap';

@Component({
    selector: 'singleclient',
    templateUrl: './single-client.template.html',
})

export class SingleClientComponent {

    ngOnInit() {
        //this.route.params
        // (+) converts string 'id' to a number
           /* .switchMap((params: Params) => this.clientService.getHero(+params['id']))
            .subscribe((hero: Hero) => this.hero = hero);*/



    }

    clientId:String = "Test client"; //testing purpose only

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private clientService: ClientService
    ) {}


}