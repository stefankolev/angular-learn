import { Component, OnInit, Input, ViewEncapsulation, OnChanges, SimpleChanges,
   DoCheck, AfterContentInit, AfterContentChecked, AfterViewInit, AfterViewChecked,
    OnDestroy, ViewChild, ElementRef, ContentChild } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css'], 
  encapsulation: ViewEncapsulation.ShadowDom
})
export class ServerElementComponent implements OnInit, OnChanges, DoCheck, AfterContentInit, AfterContentChecked
, AfterViewInit, AfterViewChecked, OnDestroy{

  @Input('srvElement')element: { type: string, name: string, content: string };
  @Input() name: string;
  @ViewChild('heading', {static: true})header: ElementRef;
  @ContentChild('contentParagraph', {static: true})contentParagraph: ElementRef;

  constructor() { 
    console.log('constructor called');
  }

  ngOnChanges(changes: SimpleChanges) { 
    console.log('ngOnChanges called');
    console.log(changes);
  }

  ngOnInit() {
    console.log('ngoninit called');
    console.log('Text para: ' + this.contentParagraph.nativeElement.textContent);
  }

  ngDoCheck() { 
    console.log('ngDoCheck called');
  }

  ngAfterContentInit() { 
    console.log('Text para111: ' + this.contentParagraph.nativeElement.textContent);
    console.log('ngaftercontentinit() called');
  }

  ngAfterContentChecked() { 
    console.log('aftercontent checked');
  }


  ngAfterViewInit() { 
    console.log('Text content: ' + this.header.nativeElement.textContent);

    console.log('ngaftercViewinit() called');
  }

  ngAfterViewChecked() { 
    console.log('afterView checked');
  }

  ngOnDestroy() { 
    console.log('ondestroy')
  }

}
