import { Injectable } from "@angular/core";
import { CounterService } from "./counter.service";


export class UsersService { 

    activeUsers = ['Max', 'Anna'];
    inactiveUsers = ['Chris', 'Manu'];

    constructor(private counterService: CounterService) {}
    activateUser( id: number ) { 

        this.activeUsers.push(this.inactiveUsers[id]);
        this.inactiveUsers.splice(id, 1);
        this.counterService.activeIterations++;
    }

    inactivateUser(id: number) { 
        this.inactiveUsers.push(this.activeUsers[id]);
        this.activeUsers.splice(id, 1);
        this.counterService.inactiveIterations++;
    }

}