import { Component, OnInit } from '@angular/core';
import { UsersService } from './users.service';
import { CounterService } from './counter.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  ngOnInit(): void {

    
    this.active = this.counterService.activeIterations;
    this.inactive = this.counterService.inactiveIterations;
  }

  active : number;
  inactive: number;

  constructor(private usersService: UsersService, private counterService: CounterService) {}

}
