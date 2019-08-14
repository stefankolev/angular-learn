import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {

    this.firstObsSubscription.unsubscribe();
  }

  private firstObsSubscription: Subscription;


  constructor() { }

  ngOnInit() {

    // this.firstObsSubscription = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count++);
        if (count == 5) {
          observer.complete();
        }
        if (count > 3) {
          observer.error(new Error('count is greater 3!'));
        }
      }, 1000)
    });



    this.firstObsSubscription = customIntervalObservable.pipe(filter(
      (data) => { 
        return data > 0;
      }
    ), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error);
    }, () => {
      console.log('Observer completed successfuly!');
    });
  }

}
