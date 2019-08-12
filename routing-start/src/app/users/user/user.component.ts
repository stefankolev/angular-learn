import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit, OnDestroy {
  paramsSubscription: Subscription;

  ngOnDestroy(): void {
    this.paramsSubscription.unsubscribe();
  }
  user: {id: number, name: string};

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {
    this.user = {
      id: this.activeRoute.snapshot.params['id'],
      name: this.activeRoute.snapshot.params['name']
    };

    this.paramsSubscription = this.activeRoute.params
      .subscribe( (params) => {
        this.user = {
          id: params['id'], 
          name: params['name']
        }  
      });
  }

}
