/**
 * Created by thilina on 12/12/16.
 */
import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {

    /*getHeroes(): Promise<Hero[]> {
     return Promise.resolve(HEROES);
     }*/

    addClient(client: any) : void{
        console.log(client);
    }
}