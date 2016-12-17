

import {NgModule} from "@angular/core";
import {SearchByIdPipe} from "./search-by-id.pipe";
import {SearchByNamePipe} from "./search-by-name.pipe";
@NgModule({

    declarations:[ SearchByIdPipe, SearchByNamePipe ],
    exports: [ SearchByIdPipe, SearchByNamePipe ]
})
export class MainPipeModule {}