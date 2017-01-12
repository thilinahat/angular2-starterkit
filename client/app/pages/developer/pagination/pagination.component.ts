/**
 * Created by thilina on 1/12/17.
 */
import {Component, Output, EventEmitter, Input} from "@angular/core";

@Component({
    selector: 'pagination',
    templateUrl: 'pagination.template.html',
    styleUrls: ['pagination.css'],
})

export class PaginationComponent {

    constructor() {}

    @Input() totalPages: any[];
    @Input() currentPage: any[];
    @Output() onPageChange: EventEmitter<any> = new EventEmitter();

    onPageClick(page: number): void{
        this.onPageChange.next({page: page});
    }

    createPageIndexes(totalPages: number){
        var pages: number[] = [];
        for(var i = 1; i <= totalPages; i++){
            pages.push(i);
        }
        return pages;
    }
}