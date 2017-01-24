

import {NgModule} from "@angular/core";
import {SearchByIdPipe} from "./search-by-id.pipe";
import {SearchByNamePipe} from "./search-by-name.pipe";
import {SearchByAllPipe} from "./search-by-all.pipe";
import {filterByBranchProductsPipe} from "./filter-by-branch-product.pipe";
import {SecondsToHourMinPipe} from "./seconds-to-hour-min.pipe";
@NgModule({

    declarations:[ SearchByIdPipe, SearchByNamePipe, SearchByAllPipe, filterByBranchProductsPipe, SecondsToHourMinPipe ],
    exports: [ SearchByIdPipe, SearchByNamePipe, SearchByAllPipe, filterByBranchProductsPipe, SecondsToHourMinPipe ]
})
export class MainPipeModule {}