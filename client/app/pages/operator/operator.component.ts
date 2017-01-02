/**
 * Created by thilina on 1/1/17.
 */
import {Component} from "@angular/core";
import {  ActivatedRoute } from '@angular/router';

@Component({
    selector: 'operator',
    templateUrl: './operator.template.html',
    styleUrls: [],
})

export class OperatorComponent {

    constructor( private route: ActivatedRoute ) {}
}