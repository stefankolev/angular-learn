import { Resolve, RouterStateSnapshot, ActivatedRouteSnapshot } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { ServersService } from "../servers.service";

interface Server {
    id: number;
    name: string; 
    status: string;
}

export class ServerResolver implements Resolve<Server> {

    constructor(private serverService: ServersService ) {}

    resolve(route: ActivatedRouteSnapshot, 
        state: RouterStateSnapshot): Server | Observable<Server> | Promise<Server> {

            return this.serverService.getServer(+route.params['id']);

    } 

}