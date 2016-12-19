

import {NgModule} from "@angular/core";
import {SearchByIdPipe} from "./search-by-id.pipe";
import {SearchByNamePipe} from "./search-by-name.pipe";
import {SearchByAllPipe} from "./search-by-all.pipe";
@NgModule({

    declarations:[ SearchByIdPipe, SearchByNamePipe, SearchByAllPipe ],
    exports: [ SearchByIdPipe, SearchByNamePipe, SearchByAllPipe ]
})
export class MainPipeModule {}