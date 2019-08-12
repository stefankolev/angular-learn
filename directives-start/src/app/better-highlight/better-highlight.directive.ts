import { Directive, Renderer2, OnInit, ElementRef, HostListener, HostBinding, Input } from '@angular/core';
import { NgModuleResolver } from '@angular/compiler';

@Directive({
  selector: '[appBetterHighlight]'
})
export class BetterHighlightDirective implements OnInit{

  @Input() defaultColor: string = 'transparent';
  @Input('appBetterHighlight') highlightColor: string = 'blue';
  @HostBinding('style.backgroundColor') backgroundColor: string = this.defaultColor;

  ngOnInit(): void {

    this.backgroundColor = this.defaultColor;

    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue')
  }

  constructor(private el: ElementRef, private renderer: Renderer2) { }

  @HostListener('mouseenter') mouseover(eventData: Event) { 

    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'blue')
    this.backgroundColor = this.highlightColor;
      
  }


  @HostListener('mouseleave') mouseleave(eventData: Event) { 

    // this.renderer.setStyle(this.el.nativeElement, 'background-color', 'transparent')
    this.backgroundColor = this.defaultColor;
      
  }



}
