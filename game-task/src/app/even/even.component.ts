import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';

@Component({
  selector: 'app-even',
  templateUrl: './even.component.html',
  styleUrls: ['./even.component.css']
})
export class EvenComponent implements OnInit, OnChanges{

  @Input()inputValue: number;
  allValues: number[] = [];

  constructor() { }

  ngOnChanges(vals: SimpleChanges) { 
    if( vals.inputValue ) { 
      this.allValues.push(vals.inputValue.currentValue);
    }
    
  }
  ngOnInit() {
  }

}
