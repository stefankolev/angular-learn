import { Component, OnInit, EventEmitter, Output, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { interval } from 'rxjs';

@Component({
  selector: 'app-game-controller',
  templateUrl: './game-controller.component.html',
  styleUrls: ['./game-controller.component.css']
})
export class GameControllerComponent implements OnInit, OnChanges {

  @Input('gc-running') running: boolean = false;
  @Output() numberEmitter: EventEmitter<any> = new EventEmitter();
  intervalId: number;
  idEmitted: number = 0;

  constructor() { }

  ngOnInit() {

    
  }

  ngOnChanges(changes: SimpleChanges) {
    if( changes.running ) { 
      
      if( changes.running.currentValue ) { 
        this.intervalId = window.setInterval(() => { this.emitNumber(); }, 1000);  
      } else { 
        window.clearInterval(this.intervalId);
        this.intervalId = 0;  
      }
    }
  }

  emitNumber() {

    this.numberEmitter.emit(this.idEmitted++);

  }

}
