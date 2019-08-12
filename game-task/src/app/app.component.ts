import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-task';
  running: boolean;

  oddValue: number;
  evenValue: number;

onEmit(num: number) { 
  if( num % 2 == 0 ) { 
    this.evenValue = num;
  } else { 
    this.oddValue = num;
  }

}

startEmitter() { 
  this.running = true;
}

stopEmitter() { 
  this.running = false;
}


}
