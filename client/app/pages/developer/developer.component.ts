/**
 * Created by thilina on 1/6/17.
 */
import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";

@Component({
    selector: 'developer',
    templateUrl: 'developer.template.html',
    styles: ['.main-panel{padding: 0 50px;}'],
})

export class DeveloperComponent {

    constructor(
        private route: ActivatedRoute,

    ) {}

    ngOnInit(){

    }
}