import { Component, OnInit, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-odd',
  templateUrl: './odd.component.html',
  styleUrls: ['./odd.component.css']
})
export class OddComponent implements OnInit {

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
